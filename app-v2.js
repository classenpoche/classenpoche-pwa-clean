alert("NOUVEL APP-V2");

import { subjects } from "./data/subjects.js";

console.log("SUBJECTS :", subjects);

document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>TEST SUBJECTS</h1>
        <p>Nombre de matières : ${subjects.length}</p>
    `;

});
