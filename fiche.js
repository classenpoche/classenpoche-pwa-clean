// fiche.js
// Moteur générique de génération de fiches pédagogiques Classenpoche

/*document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("fiches");

    if (!container) return;

    // Vérifie qu'une base de données existe
    if (typeof donnees === "undefined") {
        console.error("Aucune base de données trouvée.");
        return;
    }

    afficherFiches(donnees);

});


window.addEventListener("load", () => {

    const container = document.getElementById("fiches");

    if (!container) return;

    if (!window.donnees) {
        console.error("Aucune donnée trouvée.");
        return;
    }

    afficherFiches(window.donnees);

});


function afficherFiches(elements) {

    const container = document.getElementById("fiches");

    container.innerHTML = "";

    elements.forEach(element => {

        const carte = document.createElement("article");
        carte.className = "fiche-card";


        carte.innerHTML = `

            <div class="fiche-avatar">
                ${element.image || "👤"}
            </div>

            <h2>${element.nom}</h2>

            ${element.periode ? `
                <div class="fiche-periode">
                    ${element.periode}
                </div>
            ` : ""}


            <p class="fiche-resume">
                ${element.resume || ""}
            </p>


            <div class="fiche-bloc">
                <strong>💡 Idée principale</strong>
                <p>${element.idee || ""}</p>
            </div>


            <div class="fiche-bloc">
                <strong>📖 Œuvre</strong>
                <p>${element.oeuvre || ""}</p>
            </div>


            <div class="fiche-bloc">
                <strong>📚 Théorie</strong>
                <p>${element.theorie || ""}</p>
            </div>


            ${element.lien ? `
                <a class="fiche-btn" href="${element.lien}">
                    Voir la fiche complète
                </a>
            ` : ""}

        `;


        container.appendChild(carte);

    });

}*/

window.addEventListener("load", () => {

    const container = document.getElementById("fiches");

    if (!container) {
        console.error("Zone fiches introuvable");
        return;
    }

    if (!window.donnees) {
        console.error("Données absentes");
        return;
    }

    container.innerHTML = "";

    window.donnees.forEach(economiste => {

        const carte = document.createElement("article");

        carte.className = "fiche-card";
		
		
		carte.innerHTML = `
    <h2>
        <a href="${economiste.lien}" class="fiche-lien">
            ${economiste.nom}
        </a>
    </h2>

    <p>${economiste.periode}</p>

    <p>${economiste.resume}</p>

    <p>
        <strong>Idée :</strong>
        ${economiste.idee}
    </p>

    <p>
        <strong>Œuvre :</strong>
        ${economiste.oeuvre}
    </p>

    <p>
        <strong>Théorie :</strong>
        ${economiste.theorie}
    </p>
`;
		

       

  container.appendChild(carte);
		
		
		

    });

});