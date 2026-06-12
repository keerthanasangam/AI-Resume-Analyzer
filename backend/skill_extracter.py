def extract_skills(text):

    skills_database = [
        "python",
        "sql",
        "html",
        "css",
        "javascript",
        "excel",
        "power bi",
        "tableau",
        "machine learning",
        "data analysis"
    ]

    found_skills = []

    text = text.lower()

    for skill in skills_database:
        if skill in text:
            found_skills.append(skill)

    return found_skills