import os
import numpy as np
import cv2

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from ultralytics import YOLO

# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)

CORS(app, origins=[
    "http://localhost:5000",
    "http://localhost:5173"
])

# =========================================================
# LOAD MODELS
# =========================================================

print("⏳ Loading YOLOv8 model...")
yolo_model = YOLO("yolov8n.pt")
print("✅ YOLOv8 loaded successfully")

severity_model = None

def load_severity_model():
    global severity_model
    severity_model_path = os.path.join("models", "severity_model.h5")

    if os.path.exists(severity_model_path):
        try:
            import tensorflow as tf
            print("⏳ Loading severity model...")
            severity_model = tf.keras.models.load_model(severity_model_path)
            print("✅ Severity model loaded successfully")
        except Exception as e:
            print(f"❌ Severity model load error: {e}")
            severity_model = None
    else:
        print("⚠️ severity_model.h5 not found — using fallback")

# =========================================================
# ANIMAL DETECTION — FIXED
# =========================================================

# COCO class IDs for animals
ANIMAL_CLASSES = {
    14: 'bird',
    15: 'cat',
    16: 'dog',
    17: 'horse',
    18: 'sheep',
    19: 'cow',
    20: 'elephant',
    21: 'bear',
    22: 'zebra',
    23: 'giraffe'
}
def detect_animal_yolo(img_array):
    try:
        img_pil = Image.fromarray(img_array)
        img_resized = img_pil.resize((640, 640))
        img_np = np.array(img_resized)

        # Run YOLO
        results = yolo_model(img_np, conf=0.05)
        result = results[0]

        print("=" * 40)
        print("ALL DETECTIONS:")

        if result.boxes is None or len(result.boxes) == 0:
            print("Nothing detected!")
            return "unknown", 0

        all_animals = []

        for box in result.boxes:
            cls_id = int(box.cls[0])
            confidence = float(box.conf[0])
            class_name = yolo_model.names[cls_id]
            print(f"  → {class_name} (ID:{cls_id}) = {confidence:.2f}")

            if cls_id in ANIMAL_CLASSES:
                all_animals.append({
                    "name": ANIMAL_CLASSES[cls_id],
                    "confidence": confidence
                })

        print("=" * 40)

        # No animals found
        if len(all_animals) == 0:
            print("⚠️ No animal found!")
            return "unknown", 0

        # Sort by confidence
        all_animals.sort(
            key=lambda x: x["confidence"],
            reverse=True
        )

        best = all_animals[0]

        # Reject low confidence
        if best["confidence"] < 0.30:
            print(f"⚠️ Confidence too low: {best['confidence']:.2f}")
            return "unknown", 0

        print(f"✅ Best: {best['name']} ({best['confidence']:.2f})")
        return best["name"], best["confidence"]

    except Exception as e:
        print("YOLO Error:", e)
        return "unknown", 0

# =========================================================
# SEVERITY DETECTION
# =========================================================

def detect_severity_model(img_array):

    # Use TensorFlow model if available
    if severity_model is not None:
        try:
            img_pil = Image.fromarray(img_array)
            img_resized = img_pil.resize((224, 224))
            img_np = np.array(img_resized)
            img_normalized = img_np.astype("float32") / 255.0
            img_batch = np.expand_dims(img_normalized, axis=0)

            predictions = severity_model.predict(img_batch, verbose=0)
            class_index = int(np.argmax(predictions[0]))

            severity_map = {
                0: "Mild",
                1: "Moderate",
                2: "Severe"
            }
            return severity_map.get(class_index, "Moderate")

        except Exception as e:
            print("TensorFlow inference error:", e)

    # Fallback — based on image darkness
    # Dark image = more severe injury
    brightness = np.mean(img_array)

    if brightness < 80:
        return "Severe"
    elif brightness < 150:
        return "Moderate"
    else:
        return "Mild"

# =========================================================
# HEALTH ROUTE
# =========================================================

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ResQAI AI Service Running",
        "port": 5001,
        "yolo_loaded": True,
        "severity_model_loaded": severity_model is not None
    })

# =========================================================
# PREDICT ROUTE — FIXED
# =========================================================

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Check image
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        file = request.files["image"]

        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        # Read image
        image_bytes = np.frombuffer(file.read(), np.uint8)
        img_bgr = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)

        if img_bgr is None:
            return jsonify({"error": "Invalid image"}), 400

        # Convert BGR → RGB
        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

        # Detect animal
        animal, confidence = detect_animal_yolo(img_rgb)

        # If no animal detected
        if animal == "unknown":
            return jsonify({
                "success": False,
                "animal": "unknown",
                "severity": "unknown",
                "confidence": 0,
                "message": "No animal detected! Please upload a clearer photo with good lighting."
            })

        # Detect severity
        severity = detect_severity_model(img_rgb)

        # Response
        return jsonify({
            "success": True,
            "animal": animal,
            "severity": severity,
            "confidence": round(confidence * 100, 2),
            "message": f"{animal.capitalize()} detected with {severity} injury condition."
        })

    except Exception as e:
        print("Prediction Error:", e)
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
        
# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":
    print("🚀 Starting ResQAI AI Service...")
    load_severity_model()
    print("🐾 ResQAI AI Service running on port 5001")
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )