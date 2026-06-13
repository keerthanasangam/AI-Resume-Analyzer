const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", analyzeResume);

function analyzeResume() {
    const resumeFile = document.getElementById("resume").files[0];

    if (!resumeFile) {
        alert("Please upload a resume first.");
        return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error(error);
            alert("Error connecting to backend.");
        });
}

function displayResults(data) {
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = `
        <h2>Analysis Result</h2>
        <hr>
        <p>
            <strong>Resume Skills:</strong><br>
            ${data.resume_skills.join(", ")}
        </p>
        <br>
        <p>
            <strong>Matched Skills:</strong><br>
            ${data.matched_skills.join(", ")}
        </p>
        <br>
        <p>
            <strong>Missing Skills:</strong><br>
            ${data.missing_skills.join(", ")}
        </p>
        <br>
        <p>
            <strong>Match Score:</strong>
            ${data.score.toFixed(2)}%
        </p>
        <br>
        <h3>Interview Questions</h3>
        <ul>
            ${data.questions.map(question => `<li>${question}</li>`).join("")}
        </ul>
    `;
}
