console.log("🔥 APP-V2 CHARGÉ");
import { subjects } from "./data/subjects.js";
import { levels } from "./data/levels.js";
import { courses } from "./data/courses.js";
import { quizzes } from "./data/quizzes.js";

console.log("subjects", subjects);
console.log("levels", levels);
console.log("courses", courses);
console.log("quizzes", quizzes);

console.log("COURSES ACTIFS :", courses);

document.addEventListener("DOMContentLoaded", () => {

  const app = document.getElementById("app");
  const xpDisplay = document.getElementById("xp");
  const levelupBox = document.getElementById("levelup");

  if (!app || !xpDisplay || !levelupBox) {
    app.innerHTML = "<h1>Erreur UI</h1>";
    return;
  }

  // ---------------- STATE ----------------

let state = {
  xp: Number(localStorage.getItem("xp") ?? 0) || 0,
  completed: JSON.parse(localStorage.getItem("completed") || "[]"),
  streak: Number(localStorage.getItem("streak") ?? 0) || 0,
  lastVisit: localStorage.getItem("lastVisit") || null
};

  function save() {
    localStorage.setItem("xp", state.xp);
    localStorage.setItem("completed", JSON.stringify(state.completed));
    localStorage.setItem("streak", state.streak);
    localStorage.setItem("lastVisit", state.lastVisit);

    xpDisplay.textContent = `XP : ${state.xp} 🔥 Streak : ${state.streak}`;
  }

  // ---------------- STREAK SYSTEM ----------------

  function updateStreak() {
    const today = new Date().toDateString();

    if (state.lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (state.lastVisit === yesterday) {
        state.streak += 1;
      } else {
        state.streak = 1;
      }

      state.lastVisit = today;
    }

    save();
  }

  updateStreak();

  // ---------------- BADGES ----------------

  function checkBadges() {
    if (state.xp >= 50) showBadge("🥉 Débutant");
    if (state.xp >= 150) showBadge("🥈 Intermédiaire");
    if (state.xp >= 300) showBadge("🥇 Expert");
  }

  function showBadge(text) {
    levelupBox.textContent = text;
    levelupBox.style.display = "block";

    setTimeout(() => {
      levelupBox.style.display = "none";
    }, 1500);
  }

  // ---------------- HOME ----------------

  /*function home() {
    app.innerHTML = `
      <h1>📚 Classenpoche</h1>
      <p>Choisis une matière</p>
    `;

    subjects.forEach(s => {
      const btn = document.createElement("button");
      btn.textContent = s.name;
      btn.onclick = () => showLevels(s.id);
      app.appendChild(btn);
    });
  }*/
function home() {
  app.innerHTML = `
    <h1>📚 Classenpoche</h1>
    <p>Choisis une matière</p>
  `;

  // Boutons des matières
  subjects.forEach(s => {
    const btn = document.createElement("button");
    btn.textContent = s.name;
    btn.onclick = () => showLevels(s.id);
    app.appendChild(btn);
  });

  // Bouton Retour aux cours
  const retourBtn = document.createElement("button");
  retourBtn.textContent = "📖 Retour aux cours";
  retourBtn.onclick = () => {
    window.location.href = "http://psteger.free.fr/index.html";
  };

  app.appendChild(retourBtn);
}
  // ---------------- LEVELS ----------------

  function showLevels(subjectId) {
    app.innerHTML = `<h2>Niveaux</h2>`;
console.log("subjectId =", subjectId);
console.log("courses =", courses);
    levels.forEach(l => {

      const isLocked = !courses.some(c =>
        c.subject === subjectId && c.level === l.id
      );

      const btn = document.createElement("button");
      btn.textContent = isLocked ? `🔒 ${l.name}` : `🟢 ${l.name}`;

      btn.disabled = isLocked;

      if (!isLocked) {
        btn.onclick = () => showCourses(subjectId, l.id);
      }

      app.appendChild(btn);
    });

    back(home);
  }

  // ---------------- COURSES ----------------

  function showCourses(subjectId, levelId) {
    app.innerHTML = `<h2>Cours</h2>`;

    courses
      .filter(c => c.subject === subjectId && c.level === levelId)
      .forEach(c => {

        const done = state.completed.includes(c.id);

        const btn = document.createElement("button");
        btn.textContent = done ? `✅ ${c.title}` : `📘 ${c.title}`;

        btn.onclick = () => startQuiz(c.id);

        app.appendChild(btn);
      });

    back(() => showLevels(subjectId));
  }

  // ---------------- QUIZ ----------------

  function startQuiz(courseId) {

    const quiz = quizzes[courseId];

    if (!quiz) {
      app.innerHTML = "<p>Quiz introuvable</p>";
      return;
    }

    let i = 0;
    let score = 0;

    function render() {

      if (i >= quiz.length) return finish(score, courseId);

      const q = quiz[i];

      app.innerHTML = `
        <h2>${q.q}</h2>
        <p>${i + 1} / ${quiz.length}</p>
      `;

      q.choices.forEach((c, index) => {

        const btn = document.createElement("button");
        btn.textContent = c;

        btn.onclick = () => {
          if (index === q.answer) score++;
          i++;
          render();
        };

        app.appendChild(btn);
      });
    }

    render();
  }

  // ---------------- FIN QUIZ ----------------

  
console.log("🔥 APP-V2 CHARGÉ");
import { subjects } from "./data/subjects.js";
import { levels } from "./data/levels.js";
import { courses } from "./data/courses.js";
import { quizzes } from "./data/quizzes.js";

console.log("subjects", subjects);
console.log("levels", levels);
console.log("courses", courses);
console.log("quizzes", quizzes);

console.log("COURSES ACTIFS :", courses);

document.addEventListener("DOMContentLoaded", () => {

  const app = document.getElementById("app");
  const xpDisplay = document.getElementById("xp");
  const levelupBox = document.getElementById("levelup");

  if (!app || !xpDisplay || !levelupBox) {
    document.body.innerHTML = "<h1>Erreur UI</h1>";
    return;
  }

  // ---------------- STATE ----------------

let state = {
  xp: Number(localStorage.getItem("xp") ?? 0) || 0,
  completed: JSON.parse(localStorage.getItem("completed") || "[]"),
  streak: Number(localStorage.getItem("streak") ?? 0) || 0,
  lastVisit: localStorage.getItem("lastVisit") || null
};

  function save() {
    localStorage.setItem("xp", state.xp);
    localStorage.setItem("completed", JSON.stringify(state.completed));
    localStorage.setItem("streak", state.streak);
    localStorage.setItem("lastVisit", state.lastVisit);

    xpDisplay.textContent = `XP : ${state.xp} 🔥 Streak : ${state.streak}`;
  }

  // ---------------- STREAK SYSTEM ----------------

  function updateStreak() {
    const today = new Date().toDateString();

    if (state.lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (state.lastVisit === yesterday) {
        state.streak += 1;
      } else {
        state.streak = 1;
      }

      state.lastVisit = today;
    }

    save();
  }

  updateStreak();

  // ---------------- BADGES ----------------

  function checkBadges() {
    if (state.xp >= 50) showBadge("🥉 Débutant");
    if (state.xp >= 150) showBadge("🥈 Intermédiaire");
    if (state.xp >= 300) showBadge("🥇 Expert");
  }

  function showBadge(text) {
    levelupBox.textContent = text;
    levelupBox.style.display = "block";

    setTimeout(() => {
      levelupBox.style.display = "none";
    }, 1500);
  }

  // ---------------- HOME ----------------

  /*function home() {
    app.innerHTML = `
      <h1>📚 Classenpoche</h1>
      <p>Choisis une matière</p>
    `;

    subjects.forEach(s => {
      const btn = document.createElement("button");
      btn.textContent = s.name;
      btn.onclick = () => showLevels(s.id);
      app.appendChild(btn);
    });
  }*/
function home() {
  app.innerHTML = `
    <h1>📚 Classenpoche</h1>
    <p>Choisis une matière</p>
  `;

  // Boutons des matières
  subjects.forEach(s => {
    const btn = document.createElement("button");
    btn.textContent = s.name;
    btn.onclick = () => showLevels(s.id);
    app.appendChild(btn);
  });

  // Bouton Retour aux cours
  const retourBtn = document.createElement("button");
  retourBtn.textContent = "📖 Retour aux cours";
  retourBtn.onclick = () => {
    window.location.href = "http://psteger.free.fr/index.html";
  };

  app.appendChild(retourBtn);
}
  // ---------------- LEVELS ----------------

  function showLevels(subjectId) {
    app.innerHTML = `<h2>Niveaux</h2>`;
console.log("subjectId =", subjectId);
console.log("courses =", courses);
    levels.forEach(l => {

      const isLocked = !courses.some(c =>
        c.subject === subjectId && c.level === l.id
      );

      const btn = document.createElement("button");
      btn.textContent = isLocked ? `🔒 ${l.name}` : `🟢 ${l.name}`;

      btn.disabled = isLocked;

      if (!isLocked) {
        btn.onclick = () => showCourses(subjectId, l.id);
      }

      app.appendChild(btn);
    });

    back(home);
  }

  // ---------------- COURSES ----------------

  function showCourses(subjectId, levelId) {
    app.innerHTML = `<h2>Cours</h2>`;

    courses
      .filter(c => c.subject === subjectId && c.level === levelId)
      .forEach(c => {

        const done = state.completed.includes(c.id);

        const btn = document.createElement("button");
        btn.textContent = done ? `✅ ${c.title}` : `📘 ${c.title}`;

        btn.onclick = () => startQuiz(c.id);

        app.appendChild(btn);
      });

    back(() => showLevels(subjectId));
  }

  // ---------------- QUIZ ----------------

  function startQuiz(courseId) {

    const quiz = quizzes[courseId];

    if (!quiz) {
      app.innerHTML = "<p>Quiz introuvable</p>";
      return;
    }

    let i = 0;
    let score = 0;

    function render() {

      if (i >= quiz.length) return finish(score, courseId);

      const q = quiz[i];

      app.innerHTML = `
        <h2>${q.q}</h2>
        <p>${i + 1} / ${quiz.length}</p>
      `;

      q.choices.forEach((c, index) => {

        const btn = document.createElement("button");
        btn.textContent = c;

        btn.onclick = () => {
          if (index === q.answer) score++;
          i++;
          render();
        };

        app.appendChild(btn);
      });
    }

    render();
  }

  // ---------------- FIN QUIZ ----------------

  
 /* function finish(score, courseId) {

    const gained = score * 10;
    state.xp += gained;

    if (!state.completed.includes(courseId)) {
      state.completed.push(courseId);
    }

    save();
    checkBadges();

    levelupBox.textContent = `+${gained} XP`;
    levelupBox.style.display = "block";

    setTimeout(() => {
      levelupBox.style.display = "none";
    }, 1200);

    app.innerHTML = `
      <h2>🎉 Résultat</h2>
      <p>Score : ${score}</p>
      <p>XP +${gained}</p>
      <button id="homeBtn">🏠 Accueil</button>
    `;

    document.getElementById("homeBtn").onclick = home;
  }*/

  //Affichage des résultats version 6ème

/* =====================================================
   AFFICHAGE DES RÉSULTATS (Version 6ème)
===================================================== */

// ---------------- FIN QUIZ ----------------

function finish(score, courseId) {

    const quiz = quizzes[courseId];

    const total = quiz.length;

    const gained = score * 10;

    state.xp += gained;

    if (!state.completed.includes(courseId)) {
        state.completed.push(courseId);
    }

    save();
    checkBadges();


    app.innerHTML = `

    <div class="result-card">

        <h1>🎉 Résultat</h1>

        <div style="font-size:45px">
            ${score >= total * 0.8 ? "⭐⭐⭐" : "⭐"}
        </div>

        <h2>
            ${score} bonne(s) réponse(s) sur ${total}
        </h2>

        <h2>
            Score : ${Math.round(score*100/total)} %
        </h2>

        <p>
            🏆 Tu gagnes ${gained} XP
        </p>

        <button id="homeBtn">
            🏠 Accueil
        </button>

    </div>

    `;


    document
    .getElementById("homeBtn")
    .onclick = home;

}

  
/*function afficherResultat(score, total) {

    const pourcentage = Math.round(score * 100 / total);

    let etoiles = "";
    let titre = "";
    let message = "";
    let couleur = "";

    if (pourcentage === 100) {
        etoiles = "⭐⭐⭐";
        titre = "🎉 Excellent !";
        message = "Tu as tout réussi !";
        couleur = "#22c55e";
    }

    else if (pourcentage >= 80) {
        etoiles = "⭐⭐⭐";
        titre = "👏 Très bien !";
        message = "Tu peux passer au cours suivant.";
        couleur = "#22c55e";
    }

    else if (pourcentage >= 60) {
        etoiles = "⭐⭐";
        titre = "😊 Bien joué !";
        message = "Encore un petit effort.";
        couleur = "#3b82f6";
    }

    else if (pourcentage >= 40) {
        etoiles = "⭐";
        titre = "🙂 Continue !";
        message = "Relis le cours puis recommence.";
        couleur = "#f59e0b";
    }

    else {
        etoiles = "🌱";
        titre = "💪 Courage !";
        message = "Relis le cours avant de refaire le quiz.";
        couleur = "#ef4444";
    }

    document.body.innerHTML = `

    <div style="
        max-width:500px;
        margin:40px auto;
        padding:25px;
        font-family:Arial,sans-serif;
        text-align:center;
        background:white;
        border-radius:18px;
        box-shadow:0 8px 25px rgba(0,0,0,.15);
    ">

        <div style="font-size:42px;">
            ${etoiles}
        </div>

        <h1 style="color:${couleur};margin-top:15px;">
            ${titre}
        </h1>

        <p style="font-size:22px;font-weight:bold;">
            ${score} bonne(s) réponse(s) sur ${total}
        </p>

        <div style="
            font-size:46px;
            font-weight:bold;
            color:${couleur};
            margin:20px 0;
        ">
            ${pourcentage} %
        </div>

        <p style="
            font-size:22px;
            line-height:1.5;
        ">
            ${message}
        </p>

        <button
            onclick="location.reload();"
            style="
                margin-top:25px;
                padding:15px 35px;
                font-size:20px;
                border:none;
                border-radius:12px;
                background:#2563eb;
                color:white;
                cursor:pointer;
            ">
            🔄 Recommencer
        </button>

    </div>

    `;

}*/
  
  // ---------------- BACK ----------------

  function back(fn) {
    const btn = document.createElement("button");
    btn.textContent = "⬅ Retour";
    btn.onclick = fn;
    app.appendChild(btn);
  }

  // ---------------- START ----------------

  home();

});

  //Affichage des résultats version 6ème

/* =====================================================
   AFFICHAGE DES RÉSULTATS (Version 6ème)
===================================================== */

function afficherResultat(score, total) {

    const pourcentage = Math.round(score * 100 / total);

    let etoiles = "";
    let titre = "";
    let message = "";
    let couleur = "";

    if (pourcentage === 100) {
        etoiles = "⭐⭐⭐";
        titre = "🎉 Excellent !";
        message = "Tu as tout réussi !";
        couleur = "#22c55e";
    }

    else if (pourcentage >= 80) {
        etoiles = "⭐⭐⭐";
        titre = "👏 Très bien !";
        message = "Tu peux passer au cours suivant.";
        couleur = "#22c55e";
    }

    else if (pourcentage >= 60) {
        etoiles = "⭐⭐";
        titre = "😊 Bien joué !";
        message = "Encore un petit effort.";
        couleur = "#3b82f6";
    }

    else if (pourcentage >= 40) {
        etoiles = "⭐";
        titre = "🙂 Continue !";
        message = "Relis le cours puis recommence.";
        couleur = "#f59e0b";
    }

    else {
        etoiles = "🌱";
        titre = "💪 Courage !";
        message = "Relis le cours avant de refaire le quiz.";
        couleur = "#ef4444";
    }

    document.body.innerHTML = `

    <div style="
        max-width:500px;
        margin:40px auto;
        padding:25px;
        font-family:Arial,sans-serif;
        text-align:center;
        background:white;
        border-radius:18px;
        box-shadow:0 8px 25px rgba(0,0,0,.15);
    ">

        <div style="font-size:42px;">
            ${etoiles}
        </div>

        <h1 style="color:${couleur};margin-top:15px;">
            ${titre}
        </h1>

        <p style="font-size:22px;font-weight:bold;">
            ${score} bonne(s) réponse(s) sur ${total}
        </p>

        <div style="
            font-size:46px;
            font-weight:bold;
            color:${couleur};
            margin:20px 0;
        ">
            ${pourcentage} %
        </div>

        <p style="
            font-size:22px;
            line-height:1.5;
        ">
            ${message}
        </p>

        <button
            onclick="location.reload();"
            style="
                margin-top:25px;
                padding:15px 35px;
                font-size:20px;
                border:none;
                border-radius:12px;
                background:#2563eb;
                color:white;
                cursor:pointer;
            ">
            🔄 Recommencer
        </button>

    </div>

    `;

}
  
  // ---------------- BACK ----------------

  function back(fn) {
    const btn = document.createElement("button");
    btn.textContent = "⬅ Retour";
    btn.onclick = fn;
    app.appendChild(btn);
  }

  // ---------------- START ----------------

  home();

});
