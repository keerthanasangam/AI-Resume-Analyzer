const analyzeBtn = document.getElementById("analyzeBtn");
const resumeInput = document.getElementById("resume");
const fileName = document.getElementById("fileName");
const resultDiv = document.getElementById("result");

analyzeBtn.addEventListener("click", analyzeResume);
resumeInput.addEventListener("change", updateFileName);

updateFileName();

function updateFileName() {
    const resumeFile = resumeInput.files[0];

    fileName.textContent = resumeFile ? resumeFile.name : "No file selected";
}

function analyzeResume() {
    const resumeFile = resumeInput.files[0];

    if (!resumeFile) {
        alert("Please upload a resume first.");
        return;
    }

    const jobDescription = document.getElementById("jobDescription").value;

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Analyzing...";
    resultDiv.className = "result-empty result-loading";
    resultDiv.innerHTML = "Analyzing your resume and job description...";

    fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }

            console.log(data);
            displayResults(data);
        })
        .catch(error => {
            console.error(error);
            resultDiv.className = "result-empty error-state";
            resultDiv.innerHTML = `
                <strong>Analysis failed.</strong><br>
                ${escapeHtml(error.message || "Error connecting to backend.")}
            `;
        })
        .finally(() => {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = "Analyze Resume";
        });

}

function displayResults(data) {
    const matchScore = Number(data.score || 0).toFixed(2);
    const atsScore = Number(data.ats_score || 0).toFixed(0);

    resultDiv.className = "result-layout";
    resultDiv.innerHTML = `
        <div class="success-banner">
            <span class="success-icon">✅</span>
            <div>
                <strong>Resume analyzed successfully</strong>
                <p>✅ Resume analyzed successfully</p>
            </div>
        </div>

        <div class="score-card">
            <div class="score-row">
                <span>Match Score</span>
                <span>${matchScore}%</span>
            </div>
            <div class="score-track" aria-hidden="true">
                <div class="score-fill" style="width: ${Math.min(Math.max(matchScore, 0), 100)}%"></div>
            </div>
        </div>

        <div class="metric-grid">
            <div class="metric-card">
                <h3>ATS Score</h3>
                <p class="stat-value">${atsScore}/100</p>
                <p class="text-muted">How well the resume fits an ATS-style screening.</p>
            </div>
            <div class="metric-card">
                <h3>Skills Summary</h3>
                <p class="text-muted">${data.matched_skills.length} matched / ${data.missing_skills.length} missing</p>
            </div>
        </div>

        <div class="content-block">
            <h3>Matched Skills</h3>
            ${renderChipList(data.matched_skills, "No matched skills detected.")}
        </div>

        <div class="content-block">
            <h3>Missing Skills</h3>
            ${renderChipList(data.missing_skills, "No missing skills detected.")}
        </div>

        <div class="content-block">
            <h3>Resume Skills</h3>
            ${renderChipList(data.resume_skills, "No resume skills extracted.")}
        </div>

        <div class="content-block">
            <h3>Job Skills</h3>
            ${renderChipList(data.job_skills, "No job skills extracted.")}
        </div>

        <div class="content-block">
            <h3>Interview Questions</h3>
            ${renderBulletList(data.questions, "No interview questions generated.")}
        </div>

        <div class="content-block">
            <h3>Recommended Learning Path</h3>
            ${renderBulletList(data.learning_path, "No learning path generated.")}
        </div>
    `;
}

function renderChipList(items, emptyMessage) {
    if (!items || !items.length) {
        return `<p class="text-muted">${escapeHtml(emptyMessage)}</p>`;
    }

    return `<ul class="chip-list">${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderBulletList(items, emptyMessage) {
    if (!items || !items.length) {
        return `<p class="text-muted">${escapeHtml(emptyMessage)}</p>`;
    }

    return `<ul class="bullet-list">${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
