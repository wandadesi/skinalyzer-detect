from app.utils.firebase import db
from app.utils.inference import detect_face_cleanliness
from flask import Blueprint, jsonify, request,redirect, session
# Main Blueprint (untuk halaman root)
main = Blueprint("main", __name__)

@main.route("/")
def index():
    return redirect("http://localhost:5173")



api = Blueprint("api", __name__)
@api.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    image_data = data.get("image_base64")
    user_id = data.get("user_id")

    if not image_data or not user_id:
        return jsonify({"error": "Missing image or user_id"}), 400

    result = detect_face_cleanliness(image_data)
    print("Result from detection:", result)

    # Simpan ke Firebase
    db.collection("analyses").add(
        {"user_id": user_id, "result": result}
    )

    return jsonify(result)


auth = Blueprint("auth", __name__)
import bcrypt

@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    user_id = data.get("user_id")
    password = data.get("password")
    print("Data diterima:", data)

    if not user_id or not password:
        return jsonify({"error": "Missing user_id or password"}), 400

    user_doc = db.collection("users").document(user_id).get()

    if not user_doc.exists:
        print("User tidak ditemukan")
        return jsonify({"error": "User not found"}), 404

    user_data = user_doc.to_dict()
    print("User data dari Firestore:", user_data)

    # Cek password dengan bcrypt
    hashed_password = user_data.get("password").encode("utf-8")
    if not bcrypt.checkpw(password.encode("utf-8"), hashed_password):
        return jsonify({"error": "Incorrect password"}), 401

    return jsonify({"message": "Login successful", "user_id": user_id})


@auth.route("/logout", methods=["POST", "OPTIONS"])
def logout():
    if request.method == "OPTIONS":
        # Tangani preflight request dengan kosong saja
        return '', 204
    session.clear()
    return jsonify({"message": "Logout successful"}), 200

@auth.route("/protected")
def protected():
    user = get_current_user()
    if not user:
        return {"error": "Unauthorized"}, 401
    return {"message": f"Hello {user['email']}"}

