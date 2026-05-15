import pickle

def predict_category(data):

    model = pickle.load(open("appointment_model.pkl", "rb"))
    vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

    if not data or "symptoms" not in data:
        return {"error": "Symptoms required"}

    symptoms = data["symptoms"]

    transformed = vectorizer.transform([symptoms])
    prediction = model.predict(transformed)[0]
    confidence = round(max(model.predict_proba(transformed)[0]) * 100, 2)

    return {
        "category": prediction,
        "confidence": confidence
    }
