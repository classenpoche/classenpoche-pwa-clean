alert("NOUVEL APP-V2");

import { subjects } from "./data/subjects.js";
import { levels } from "./data/levels.js";
import { courses } from "./data/courses.js";
import { quizzes } from "./data/quizzes.js";

console.log("SUBJECTS :", subjects);
console.log("LEVELS :", levels);
console.log("COURSES :", courses);
console.log("QUIZZES :", quizzes);

document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>TEST QUIZZES</h1>
        <p>Matières : ${subjects.length}</p>
        <p>Niveaux : ${levels.length}</p>
        <p>Cours : ${courses.length}</p>
        <p>Quiz : ${quizzes.length}</p>
    `;

});
