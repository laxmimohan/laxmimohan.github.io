from flask import Flask, request, jsonify, render_template
from sklearn.externals import joblib

# Load classifer
classifier = joblib.load("stroke_predictor.model")

# Create standard scaler
standard_scaler = joblib.load("standard_scaler.model")

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/predict")
def predict():
    age = float(request.args.get("age")) or 0
    average_glucose_level = float(request.args.get("agl")) or 0
    bmi = float(request.args.get("bmi")) or 0

    work_type_mapper = {
        "self_employed": [1,0,0],
        "children": [0,1,0],
        "other": [0,0,1]
    }
    work_type = request.args.get("work_type")

    smoking_status_mapper = {
        "formerly_smoked": [1, 0, 0],
        "never_smoked": [0, 1, 0],
        "smokes": [0, 0, 1]
    }
    smoking_status = request.args.get("smoking_status")

    # hypertension = int(request.args.get("hypertension")) or 0
    # heart_disease = int(request.args.get("heart_disease")) or 0
    # ever_married = int(request.args.get("ever_married")) or 0

    hypertension_mapper = {
        0: [1, 0],
        1: [0, 1]
    }
    hypertension = request.args.get("hypertension") or 0
    if hypertension == "1":
        hypertension = 1

    heart_disease_mapper = {
        0: [1, 0],
        1: [0, 1]
    }
    heart_disease = request.args.get("heart_disease") or 0
    if heart_disease == "1":
        heart_disease = 1

    ever_married_mapper = {
        0: [1, 0],
        1: [0, 1]
    }
    ever_married = request.args.get("ever_married") or 0
    if ever_married == "1":
        ever_married = 1

    features = [[age,
                 average_glucose_level,
                 bmi,
                 work_type_mapper[work_type][0],
                 work_type_mapper[work_type][1],
                 work_type_mapper[work_type][2],
                 smoking_status_mapper[smoking_status][0],
                 smoking_status_mapper[smoking_status][1],
                 smoking_status_mapper[smoking_status][2],
                 hypertension_mapper[hypertension][0],
                 hypertension_mapper[hypertension][1],
                 heart_disease_mapper[heart_disease][0],
                 heart_disease_mapper[heart_disease][1],
                 ever_married_mapper[ever_married][0],
                 ever_married_mapper[ever_married][1]]]

    scaled_features = standard_scaler.transform(features)

    prediction = classifier.predict(scaled_features)
    # prediction = classifier.predict(features)
    prediction_probability = classifier.predict_proba(scaled_features)
    # prediction_probability = classifier.predict_proba(features)

    print(100*"#")
    print(features)
    # print(features.shape)
    # print(scaled_features.shape)
    print(100*"#")

    # return jsonify(features)
    return jsonify([{"stroke_prediction": prediction.tolist(),
                    "stroke_prediction_probability": prediction_probability.tolist(),
                    "features": features}])

if __name__ == "__main__":
    app.run(debug=True)