print("AI Resume Analyzer Project Started")
from resume_parser import extract_text
from skill_extracter import extract_skills

pdf_path = "../uploads/Keerthana.pdf"

resume_text = extract_text(pdf_path)

skills = extract_skills(resume_text)

print("===== SKILLS FOUND =====")
print(skills)