import base64
import io

import numpy as np
from PIL import Image
from ultralytics import YOLO


# Load YOLO model (pastikan path dan file model Anda benar)
model = YOLO("app/model/face_detect.pt")


def detect_face_cleanliness(base64_image):
    # Decode base64 ke format gambar
    image = Image.open(io.BytesIO(base64.b64decode(base64_image))).convert("RGB")

    # Jalankan prediksi
    results = model.predict(image, conf=0.25)  # Anda bisa atur confidence threshold

    output = []
    for box in results[0].boxes:
        label_id = int(box.cls[0].item())
        label = model.names[label_id]
        confidence = round(float(box.conf[0].item()), 2)
        xyxy = box.xyxy[0].tolist()  # [xmin, ymin, xmax, ymax]

        output.append({
            "label": label,
            "confidence": confidence,
            "bbox": xyxy,
        })

    return {"num_detections": len(output), "detections": output}
