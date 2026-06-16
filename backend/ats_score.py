def calculate_ats_score(
    resume_text,
    matched_skills,
    job_skills
):
    score = 0

    # Skills Score (50 Marks)
    if job_skills and len(job_skills) > 0:
        skills_score = (len(matched_skills) / len(job_skills)) * 50
    else:
        skills_score = 0

    score += skills_score

    # Resume Length (20 Marks)
    if resume_text and len(resume_text) > 500:
        score += 20

    # Projects Section (15 Marks)
    if resume_text and "project" in resume_text.lower():
        score += 15

    # Education Section (15 Marks)
    if (
        resume_text
        and (
            "education" in resume_text.lower()
            or "degree" in resume_text.lower()
        )
    ):
        score += 15

    return round(score, 2)