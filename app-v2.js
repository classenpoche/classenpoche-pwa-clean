// =====================================
// CLASSENPOCHE - app-v2.js
// V1 stable
// =====================================

import { subjects } from "./data/subjects.js";
import { levels } from "./data/levels.js";
import { courses } from "./data/courses.js";
import { quizzes } from "./data/quizzes.js";

console.log("🔥 APP-V2 CHARGÉ");
console.log("SUBJECTS :", subjects);
console.log("LEVELS :", levels);
console.log("COURSES :", courses);
console.log("QUIZZES :", quizzes);


// =====================================
// INITIALISATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById("app");
    const xpDisplay = document.getElementById("xp");

    if (!app) {
        console.error("APP absent");
        return;
    }


    // =================================
    // XP / STREAK
    // =================================

    let xp = Number(localStorage.getItem("xp") || 0);
    let streak = Number(localStorage.getItem("streak") || 0);

    function updateXPDisplay() {

        if (xpDisplay) {

            xpDisplay.textContent =
                `XP : ${xp} 🔥 Streak : ${streak}`;

        }

    }


    updateXPDisplay();


    // =================================
    // ACCUEIL : MATIÈRES
    // =================================

    function showSubjects() {

        app.innerHTML = `

            <h1>📚 Classenpoche</h1>

            <p>Choisis une matière</p>

            <div id="subjects"></div>

        `;


        const container =
            document.getElementById("subjects");


        subjects.forEach(subject => {

            const button =
                document.createElement("button");

            button.textContent =
                subject.name;

            button.className =
                "subject-btn";

            button.addEventListener(
                "click",
                () => {

                    showLevels(subject.id);

                }
            );

            container.appendChild(button);

        });

    }


    // =================================
    // NIVEAUX
    // =================================

    function showLevels(subjectId) {

        const subject =
            subjects.find(
                s => s.id === subjectId
            );


        app.innerHTML = `

            <button id="backSubjects">
                ← Matières
            </button>

            <h1>
                ${subject ? subject.name : ""}
            </h1>

            <p>Choisis ton niveau</p>

            <div id="levels"></div>

        `;


        document
            .getElementById("backSubjects")
            .addEventListener(
                "click",
                showSubjects
            );


        const container =
            document.getElementById("levels");


        // Niveaux utilisés par cette matière
        const usedLevels =
            levels.filter(level =>

                courses.some(course =>
                    course.subject === subjectId &&
                    course.level === level.id
                )

            );


        usedLevels.forEach(level => {

            const button =
                document.createElement("button");

            button.textContent =
                level.name;

            button.className =
                "level-btn";


            button.addEventListener(
                "click",
                () => {

                    showCourses(
                        subjectId,
                        level.id
                    );

                }
            );


            container.appendChild(button);

        });

    }


    // =================================
    // COURS
    // =================================

    function showCourses(
        subjectId,
        levelId
    ) {

        const subject =
            subjects.find(
                s => s.id === subjectId
            );


        const level =
            levels.find(
                l => l.id === levelId
            );


        const filteredCourses =
            courses.filter(course =>

                course.subject === subjectId &&
                course.level === levelId

            );


       app.innerHTML = `

    <button id="backQuiz" class="back-course-btn">
        ← Retour aux cours
    </button>

    <h1>
        ${course.title}
    </h1>

    <p>
        Question
        ${questionIndex + 1}
        /
        ${questions.length}
    </p>

    <div class="quiz-question">

        <h2>
            ${question.q}
        </h2>

        <div id="choices"></div>

    </div>

`;


        document
            .getElementById("backLevels")
            .addEventListener(
                "click",
                () => {

                    showLevels(subjectId);

                }
            );


        const container =
            document.getElementById("courses");


        filteredCourses.forEach(course => {

            const button =
                document.createElement("button");


            button.textContent =
                course.title;


            button.className =
                "course-btn";


            button.addEventListener(
                "click",
                () => {

                    startQuiz(course);

                }
            );


            container.appendChild(button);

        });

    }


    // =================================
    // QUIZ
    // =================================

    function startQuiz(course) {

        const questions =
            quizzes[course.id];


        if (!questions) {

            app.innerHTML = `


<button id="backQuiz" class="back-course-btn">
    ← Retour aux cours
</button>

           

                <h1>⚠️ Quiz introuvable</h1>

                <p>
                    Aucun quiz n'est associé à :
                    <strong>
                        ${course.title}
                    </strong>
                </p>

            `;


document
    .getElementById("backQuiz")
    .addEventListener(
        "click",
        () => {

            showCourses(
                course.subject,
                course.level
            );

        }
    );



            
       


        let questionIndex = 0;
        let score = 0;


        function showQuestion() {

            const question =
                questions[questionIndex];


            app.innerHTML = `

                <button id="backQuiz">
                    ← Cours
                </button>

                <h1>
                    ${course.title}
                </h1>

                <p>
                    Question
                    ${questionIndex + 1}
                    /
                    ${questions.length}
                </p>

                <div class="quiz-question">

                    <h2>
                        ${question.q}
                    </h2>

                    <div id="choices"></div>

                </div>

            `;


            document
                .getElementById("backQuiz")
                .addEventListener(
                    "click",
                    () => {

                        showCourses(
                            course.subject,
                            course.level
                        );

                    }
                );


            const choices =
                document.getElementById(
                    "choices"
                );


            question.choices.forEach(
                (choice, index) => {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.textContent =
                        choice;


                    button.className =
                        "choice-btn";


                    button.addEventListener(
                        "click",
                        () => {

                            if (
                                index ===
                                question.answer
                            ) {

                                score++;

                            }


                            questionIndex++;


                            if (
                                questionIndex >=
                                questions.length
                            ) {

                                finishQuiz();

                            } else {

                                showQuestion();

                            }

                        }
                    );


                    choices.appendChild(
                        button
                    );

                }
            );

        }


        // =================================
        // FIN DU QUIZ
        // =================================

        function finishQuiz() {

            const gainedXP =
                score * 10;


            xp += gainedXP;


            localStorage.setItem(
                "xp",
                xp
            );


            streak++;


            localStorage.setItem(
                "streak",
                streak
            );


            updateXPDisplay();


            app.innerHTML = `

                <h1>🎉 Quiz terminé !</h1>

                <h2>
                    ${course.title}
                </h2>

                <p>
                    Score :
                    <strong>
                        ${score} / ${questions.length}
                    </strong>
                </p>

                <p>
                    +${gainedXP} XP
                </p>

                <button id="backHome">
                    🏠 Retour aux matières
                </button>

            `;


            document
                .getElementById("backHome")
                .addEventListener(
                    "click",
                    showSubjects
                );

        }


        showQuestion();

    }


    // =================================
    // LANCEMENT
    // =================================

    showSubjects();

});
