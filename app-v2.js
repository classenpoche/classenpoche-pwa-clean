console.log("🔥 APP-V2 CHARGÉ");


import { subjects } from "./data/subjects.js";
import { levels } from "./data/levels.js";
import { courses } from "./data/courses.js";
import { quizzes } from "./data/quizzes.js";

console.log("SUBJECTS :", subjects);
console.log("LEVELS :", levels);
console.log("COURSES :", courses);
console.log("QUIZZES :", quizzes);


console.log("DATA OK");


document.addEventListener("DOMContentLoaded", () => {

const app = document.getElementById("app");

if(!app){
    console.error("APP absent");
    return;
}


app.innerHTML =
`
<h1>📚 Classenpoche</h1>
<p>Choisis une matière</p>
`;
// =====================================
// Classenpoche - app-v2.js
// Version Stable 1.0
// =====================================



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

            console.log("Erreur Service Worker :", error);

        });

    });

}




// -------------------------------------
// Gestion XP / progression
// -------------------------------------


function updateXPDisplay() {


    const xpDisplay = document.getElementById("xpDisplay");


    if (!xpDisplay) {

        return;

    }


    const xp = Number(localStorage.getItem("xp") || 0);

    const streak = Number(localStorage.getItem("streak") || 0);



    xpDisplay.textContent =
        `XP : ${xp} 🔥 Streak : ${streak}`;


    console.log(
        "XP affiché :",
        xp,
        "Streak :",
        streak
    );


}




// -------------------------------------
// Initialisation
// -------------------------------------


document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateXPDisplay();

    }
);
});