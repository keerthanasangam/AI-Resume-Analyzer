def get_interview_questions(skills):

    questions_database = {

        "python": [
            "What is Python?",
            "What is the difference between a list and a tuple?",
            "Explain OOP in Python."
        ],

        "sql": [
            "What is a JOIN?",
            "What is the difference between WHERE and HAVING?",
            "What is a PRIMARY KEY?"
        ],

        "html": [
            "What is HTML?",
            "What is the difference between div and span?"
        ],

        "css": [
            "What is Flexbox?",
            "What is the difference between margin and padding?"
        ],

        "javascript": [
            "What is a closure?",
            "What is the difference between let, var and const?"
        ]
    }

    interview_questions = []

    for skill in skills:

        if skill in questions_database:
            interview_questions.extend
            (
                questions_database[skill]
            )

    return interview_questions