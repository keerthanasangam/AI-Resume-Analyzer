from flask import Flask, request
from flask_cors import CORS

from resume_parser import extract_text
from skill_extracter import extract_skills
from match_score import calculate_match_score
from interview_questions import get_interview_questions

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI Resume Analyzer Backend Running"

@app.route("/analyze", methods=["POST"])
def analyze():
    uploaded_file = request.files.get("resume")
    if not uploaded_file:
        return {"error": "No resume file provided"}, 400

    pdf_path = f"../uploads/{uploaded_file.filename}"
    uploaded_file.save(pdf_path)

    resume_text = extract_text(pdf_path)
    resume_skills = extract_skills(resume_text)

    job_skills = ["python", "sql", "power bi", "tableau"]

    matched_skills, missing_skills, score = calculate_match_score(
        resume_skills, job_skills
    )

    questions = get_interview_questions(resume_skills)

    return {
        "resume_skills": resume_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "score": score,
        "questions": questions,
    }

if __name__ == "__main__":
    app.run(debug=True)
