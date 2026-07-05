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

  const course = courses.find(c => c.id === courseId);
  const quiz = quizzes[courseId];

  if (!quiz) {
    app.innerHTML = "<p>Quiz introuvable</p>";
    return;
  }

  // 1. afficher le cours AVANT le quiz
  app.innerHTML = `
    <div style="padding:20px">
      <h2>📘 Cours</h2>
      <p>${course.lesson || "Pas de cours disponible"}</p>

      <button id="startQuizBtn">
        🚀 Commencer le quiz
      </button>
    </div>
  `;

  // 2. bouton pour lancer le quiz
  document.getElementById("startQuizBtn").onclick = () => {
    runQuiz(quiz, courseId);
  };
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

  function finish(score, courseId) {

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
