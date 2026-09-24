// ==============================
// USER SIGNUP
// ==============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        document.getElementById("signupMessage").textContent =
            "Account created successfully!";

        signupForm.reset();
    });
}


// ==============================
// USER LOGIN
// ==============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            document.getElementById("loginMessage").textContent =
                "No account found. Please sign up first.";
            return;
        }

        const user = JSON.parse(storedUser);

        if (email === user.email && password === user.password) {

            localStorage.setItem("loggedIn", "true");

            window.location.href = "user-dashboard.html";

        } else {

            document.getElementById("loginMessage").textContent =
                "Invalid email or password.";
        }
    });
}


// ==============================
// USER LOGOUT
// ==============================

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}


// ==============================
// USER PAGE PROTECTION
// ==============================

// If student is already logged in,
// opening Home page will return to Dashboard

const currentPage = window.location.pathname;

if (
    currentPage.includes("index.html") &&
    localStorage.getItem("loggedIn") === "true"
) {
    window.location.href = "user-dashboard.html";
}


if (
    (
        currentPage.includes("user-dashboard.html") ||
        currentPage.includes("exam.html") ||
        currentPage.includes("result.html") ||
        currentPage.includes("profile.html")
    ) &&
    localStorage.getItem("loggedIn") !== "true"
) {
    window.location.href = "login.html";
}

// ==============================
// USER NAVIGATION
// ==============================

const mainNav = document.getElementById("mainNav");

if (mainNav && localStorage.getItem("loggedIn") === "true") {

    mainNav.innerHTML = `
        <a href="user-dashboard.html">Dashboard</a>
        <a href="#" onclick="logout()">Logout</a>
    `;
}

// ==============================
// EXAM TIMER
// ==============================

const timerElement = document.getElementById("timer");

if (timerElement) {

    let timeLeft = 5 * 60;

    const examTimer = setInterval(function () {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerElement.textContent =
            minutes + ":" + seconds;

        timeLeft--;

        if (timeLeft < 0) {

            clearInterval(examTimer);

            alert("Time is up! Your exam will be submitted.");

            const examPageForm =
                document.getElementById("examForm");

            if (examPageForm) {
                examPageForm.requestSubmit();
            }
        }

    }, 1000);
}


// ==============================
// EXAM SUBMISSION
// ==============================

const examPageForm = document.getElementById("examForm");

if (
    examPageForm &&
    document.getElementById("timer")
) {

    examPageForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let score = 0;

        const answers = {
            q1: "HTML",
            q2: "CSS",
            q3: "JavaScript",
            q4: "Local Storage",
            q5: "CSS Grid"
        };

        for (let question in answers) {

            const selectedAnswer = document.querySelector(
                'input[name="' + question + '"]:checked'
            );

            if (
                selectedAnswer &&
                selectedAnswer.value === answers[question]
            ) {
                score++;
            }
        }

        localStorage.setItem("examScore", score);

        window.location.href = "result.html";
    });
}


// ==============================
// RESULT PAGE
// ==============================

const scoreElement = document.getElementById("score");

if (scoreElement) {

    const score = localStorage.getItem("examScore");

    if (score !== null) {

        scoreElement.textContent = score;

        const resultMessage =
            document.getElementById("resultMessage");

        if (Number(score) >= 3) {

            resultMessage.textContent =
                "Good job! You passed the examination.";

        } else {

            resultMessage.textContent =
                "Keep practicing and try again.";
        }
    }
}


// ==============================
// STUDENT PROFILE
// ==============================

const profileName = document.getElementById("profileName");

if (profileName) {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

        const user = JSON.parse(storedUser);

        document.getElementById("profileName").textContent =
            user.name;

        document.getElementById("profileEmail").textContent =
            user.email;

        const score = localStorage.getItem("examScore");

        if (score !== null) {

            document.getElementById("profileScore").textContent =
                score + " / 5";
        }
    }
}


// ==============================
// ADMIN LOGIN
// ==============================

const adminLoginForm =
    document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("adminEmail").value.trim();

        const password =
            document.getElementById("adminPassword").value;

        if (
            email === "admin@exam.com" &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            window.location.href =
                "admin-dashboard.html";

        } else {

            document.getElementById(
                "adminLoginMessage"
            ).textContent =
                "Invalid admin email or password.";
        }
    });
}


// ==============================
// ADMIN LOGOUT
// ==============================

function adminLogout() {

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "admin-login.html";
}


// ==============================
// ADMIN PAGE PROTECTION
// ==============================

if (
    (
        currentPage.includes("admin-dashboard.html") ||
        currentPage.includes("manage-questions.html") ||
        currentPage.includes("manage-exams.html") ||
        currentPage.includes("admin-results.html")
    ) &&
    localStorage.getItem("adminLoggedIn") !== "true"
) {

    window.location.href = "admin-login.html";
}


// ==============================
// MANAGE QUESTIONS
// ==============================

const questionForm =
    document.getElementById("questionForm");

if (questionForm) {

    displayQuestions();

    questionForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const question =
            document.getElementById("question").value;

        const option1 =
            document.getElementById("option1").value;

        const option2 =
            document.getElementById("option2").value;

        const option3 =
            document.getElementById("option3").value;

        const option4 =
            document.getElementById("option4").value;

        const correctAnswer =
            document.getElementById("correctAnswer").value;

        const newQuestion = {

            question: question,

            options: [
                option1,
                option2,
                option3,
                option4
            ],

            correctAnswer: correctAnswer
        };

        let questions =
            JSON.parse(localStorage.getItem("questions")) || [];

        questions.push(newQuestion);

        localStorage.setItem(
            "questions",
            JSON.stringify(questions)
        );

        document.getElementById(
            "questionMessage"
        ).textContent =
            "Question added successfully!";

        questionForm.reset();

        displayQuestions();
    });
}


function displayQuestions() {

    const questionList =
        document.getElementById("questionList");

    if (!questionList) {
        return;
    }

    const questions =
        JSON.parse(localStorage.getItem("questions")) || [];

    questionList.innerHTML = "";

    if (questions.length === 0) {

        questionList.innerHTML =
            "<p>No questions added yet.</p>";

        return;
    }

    questions.forEach(function (item, index) {

        const questionDiv =
            document.createElement("div");

        questionDiv.className =
            "question-item";

        questionDiv.innerHTML = `
            <h3>${index + 1}. ${item.question}</h3>

            <p>Option 1: ${item.options[0]}</p>

            <p>Option 2: ${item.options[1]}</p>

            <p>Option 3: ${item.options[2]}</p>

            <p>Option 4: ${item.options[3]}</p>

            <p>
                <strong>Correct Answer:</strong>
                ${item.correctAnswer}
            </p>
        `;

        questionList.appendChild(questionDiv);
    });
}


// ==============================
// MANAGE EXAMS
// ==============================

const manageExamForm =
    document.getElementById("examForm");

if (
    manageExamForm &&
    document.getElementById("examName")
) {

    displayExams();

    manageExamForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const examName =
            document.getElementById("examName").value;

        const examDuration =
            document.getElementById("examDuration").value;

        const newExam = {

            name: examName,

            duration: examDuration
        };

        let exams =
            JSON.parse(localStorage.getItem("exams")) || [];

        exams.push(newExam);

        localStorage.setItem(
            "exams",
            JSON.stringify(exams)
        );

        document.getElementById(
            "examMessage"
        ).textContent =
            "Exam created successfully!";

        manageExamForm.reset();

        displayExams();
    });
}


function displayExams() {

    const examList =
        document.getElementById("examList");

    if (!examList) {
        return;
    }

    const exams =
        JSON.parse(localStorage.getItem("exams")) || [];

    examList.innerHTML = "";

    if (exams.length === 0) {

        examList.innerHTML =
            "<p>No exams created yet.</p>";

        return;
    }

    exams.forEach(function (exam, index) {

        const examDiv =
            document.createElement("div");

        examDiv.className =
            "question-item";

        examDiv.innerHTML = `
            <h3>${index + 1}. ${exam.name}</h3>

            <p>
                Duration: ${exam.duration} minutes
            </p>
        `;

        examList.appendChild(examDiv);
    });
}


// ==============================
// ADMIN RESULTS
// ==============================

const adminResult =
    document.getElementById("adminResult");

if (adminResult) {

    const storedUser =
        localStorage.getItem("user");

    const score =
        localStorage.getItem("examScore");

    if (storedUser && score !== null) {

        const user =
            JSON.parse(storedUser);

        adminResult.innerHTML = `
            <div class="question-item">

                <h3>Student Result</h3>

                <p>
                    <strong>Name:</strong>
                    ${user.name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${user.email}
                </p>

                <p>
                    <strong>Score:</strong>
                    ${score} / 5
                </p>

            </div>
        `;

    } else {

        adminResult.innerHTML =
            "<p>No student results available.</p>";
    }
}