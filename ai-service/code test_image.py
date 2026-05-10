from ultralytics import YOLO
import cv2
import sys

model = YOLO("yolov8m.pt")

# Put your cat image path here
img_path = "test_cat.jpg"

img = cv2.imread(img_path)
results = model(img, conf=0.05)
result = results[0]

print("=" * 50)
print("ALL DETECTIONS IN IMAGE:")
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