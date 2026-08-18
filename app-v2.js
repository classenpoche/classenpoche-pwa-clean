alert("NOUVEL APP-V2");

document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>TEST RÉUSSI</h1>
        <p>Le nouveau app-v2.js fonctionne.</p>
        <p>Les imports ne sont pas encore utilisés.</p>
    `;

});
