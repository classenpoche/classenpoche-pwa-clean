import { subjects } from "./data/subjects.js";
import { levels } from "./data/levels.js";
import { courses } from "./data/courses.js";
import { quizzes } from "./data/quizzes.js";

document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ APP START");

  const app = document.getElementById("app");
  const xpDisplay = document.getElementById("xp");
  const levelupBox = document.getElementById("levelup");

  // 🛑 SAFETY CHECK (évite page blanche silencieuse)
  if (!app || !xpDisplay || !levelupBox) {
    console.error("❌ DOM MANQUANT (app/xp/levelup)");
    document.body.innerHTML = "<h1>Erreur chargement interface</h1>";
    return;
  }

  let state = {
    xp: parseInt(localStorage.getItem("xp") || "0")
  };

  function saveXP() {
    localStorage.setItem("xp", state.xp);
    xpDisplay.textContent = "XP : " + state.xp;
  }

  saveXP();

  // ---------------- HOME ----------------

  function home() {
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
  }

  // ---------------- LEVELS ----------------

  function showLevels(subjectId) {
    app.innerHTML = `<h2>Niveaux</h2>`;

    levels
      .filter(l => l.subject === subjectId)
      .forEach(l => {
        const btn = document.createElement("button");
        btn.textContent = l.name;
        btn.onclick = () => showCourses(subjectId, l.id);
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
        const btn = document.createElement("button");
        btn.textContent = c.title;
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
      if (i >= quiz.length) return finish(score);

      const q = quiz[i];

      app.innerHTML = `
        <h2>${q.q}</h2>
        <p>Question ${i + 1} / ${quiz.length}</p>
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

  function finish(score) {
    const gained = score * 10;
    state.xp += gained;
    saveXP();

    showLevelUp(gained);

    app.innerHTML = `
      <h2>🎉 Résultat</h2>
      <p>Score : ${score}</p>
      <p>XP gagné : +${gained}</p>
      <button id="homeBtn">🏠 Accueil</button>
    `;

    document.getElementById("homeBtn").onclick = home;
  }

  // ---------------- LEVEL UP ----------------

  function showLevelUp(xp) {
    levelupBox.textContent = `+${xp} XP`;
    levelupBox.style.display = "block";

    setTimeout(() => {
      levelupBox.style.display = "none";
    }, 1200);
  }

  // ---------------- BACK ----------------

  function back(fn) {
    const btn = document.createElement("button");
    btn.textContent = "⬅ Retour";
    btn.onclick = fn;
    app.appendChild(btn);
  }

  // 🚀 START
  home();

});
