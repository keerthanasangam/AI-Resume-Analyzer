def extract_skills(text):

    skills_database = [
    "python",
    "java",
    "sql",
    "html",
    "css",
    "javascript",
    "dsa",
    "web development",
    "web dev",
    "flask",
    "machine learning",
    "power bi",
    "tableau",
    "react",
    "nodejs",
    "mongodb",
    "git",
    "github"
]

    found_skills = []

    text = text.lower()

    for skill in skills_database:
        if skill in text:
            found_skills.append(skill)

    return found_skills
