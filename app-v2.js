alert("NOUVEL APP-V2");

import { subjects } from "./data/subjects.js";
import { levels } from "./data/levels.js";

console.log("SUBJECTS :", subjects);
console.log("LEVELS :", levels);

document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>TEST LEVELS</h1>
        <p>Matières : ${subjects.length}</p>
        <p>Niveaux : ${levels.length}</p>
    `;

});
