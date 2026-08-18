//console.log("🔥 APP-V2 CHARGÉ");//
alert("NOUVEL APP-V2");
import { subjects } from "./data/subjects.js";
import { levels } from "./data/levels.js";
import { courses } from "./data/courses.js";
import { quizzes } from "./data/quizzes.js";

console.log("SUBJECTS :", subjects);
console.log("LEVELS :", levels);
console.log("COURSES :", courses);
console.log("QUIZZES :", quizzes);

console.log("DATA OK");


// =====================================
// Classenpoche - app-v2.js
// Version Stable 1.0
// =====================================


document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------
    // Éléments principaux
    // -------------------------------------

    const app = document.getElementById("app");
    const xpDisplay = document.getElementById("xp");

    if (!app) {
        console.error("APP absent");
        return;
    }


    // -------------------------------------
    // XP / Streak
    // -------------------------------------

    const xp = Number(localStorage.getItem("xp") || 0);
    const streak = Number(localStorage.getItem("streak") || 0);

    if (xpDisplay) {

        xpDisplay.textContent =
            `XP : ${xp} 🔥 Streak : ${streak}`;

    }


    // -------------------------------------
    // Page d'accueil
    // -------------------------------------

    app.innerHTML = `
        <h1>📚 Classenpoche</h1>
        <p>Choisis une matière</p>
    `;


    // -------------------------------------
    // Service Worker
    // -------------------------------------

    if ("serviceWorker" in navigator) {

        window.addEventListener("load", () => {

            navigator.serviceWorker
                .register("./service-worker.js")

                .then(() => {

                    console.log("Service Worker actif");

                })

                .catch(error => {

                    console.log(
                        "Erreur Service Worker :",
                        error
                    );

                });

        });

    }

});
