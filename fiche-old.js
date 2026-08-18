document.addEventListener("DOMContentLoaded", () => {


document.getElementById("icone").textContent = fiche.icone;


document.getElementById("titre").textContent =
fiche.titre;


document.getElementById("description").textContent =
fiche.description;



const zone = document.getElementById("contenu");



fiche.items.forEach(item => {


const carte = document.createElement("article");

carte.className = "carte";



carte.innerHTML = `

<div class="nom">

${item.image} ${item.nom}

</div>


<div class="periode">

${item.periode}

</div>


<p>

${item.resume}

</p>


<div class="idee">

💡 À retenir

<br>

${item.idee}

</div>


<div class="oeuvre">

📖 Œuvre :

<br>

${item.oeuvre}

</div>


`;



zone.appendChild(carte);



});



});