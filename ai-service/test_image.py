from ultralytics import YOLO
import cv2

model = YOLO("yolov8m.pt")

img_path = "test_cat.jpg"

img = cv2.imread(img_path)

if img is None:
    print("❌ Image not found!")
    print("Please save your cat image as test_cat.jpg")
    print("Inside ai-service folder")
else:
    results = model(img, conf=0.05)
    result = results[0]

    print("=" * 50)
    print("ALL DETECTIONS:")
    print("=" * 50)

    if len(result.boxes) == 0:
        print("Nothing detected at all!")
    else:
        for box in result.boxes:
            cls_id = int(box.cls[0])
            confidence = float(box.conf[0])
            class_name = model.names[cls_id]
            print(f"→ {class_name} (ID:{cls_id}) confidence: {confidence:.2f}")

    print("=" * 50)
    