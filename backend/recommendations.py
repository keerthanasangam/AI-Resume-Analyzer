def get_recommendations(missing_skills):

    recommendations = {

        "flask":
        "Learn Flask and REST APIs",

        "python":
        "Practice Python projects",

        "sql":
        "Learn Joins and Database Design",

        "machine learning":
        "Learn Scikit-Learn and ML Basics",

        "tableau":
        "Learn Data Visualization with Tableau",

        "power bi":
        "Learn Power BI Dashboards",

        "html":
        "Build responsive web pages",

        "css":
        "Practice Flexbox and Grid",

        "javascript":
        "Learn DOM and API integration"
    }

    learning_path = []

    for skill in missing_skills:

        if skill in recommendations:

            learning_path.append(
                recommendations[skill]
            )

    return learning_path