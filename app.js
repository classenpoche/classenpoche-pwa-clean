import { subjects } from "./data/subjects.js";
import { levels } from "./data/levels.js";
import { courses } from "./data/courses.js";
import { quizzes } from "./data/quizzes.js";

const app = document.getElementById("app");
const xpDisplay = document.getElementById("xp");
const levelup = document.getElementById("levelup");

let state = {
  xp: parseInt(localStorage.getItem("xp") || "0")
};

function saveXP() {
  localStorage.setItem("xp", state.xp);
  xpDisplay.textContent = "XP : " + state.xp;
}

saveXP();

/* ---------------- HOME ---------------- */

function home() {
  app.innerHTML = "<h2>Matières</h2>";

  subjects.forEach(s => {
    const btn = document.createElement("button");
    btn.textContent = s.name;
    btn.onclick = () => showLevels(s.id);
    app.appendChild(btn);
  });
}

/* ---------------- LEVELS ---------------- */

function showLevels(subjectId) {
  app.innerHTML = "<h2>Niveaux</h2>";

  levels.forEach(l => {
    const btn = document.createElement("button");
    btn.textContent = l.name;
    btn.onclick = () => showCourses(subjectId, l.id);
    app.appendChild(btn);
  });

  back(home);
}

/* ---------------- COURSES ---------------- */

function showCourses(subjectId, levelId) {
  app.innerHTML = "<h2>Cours</h2>";

  const filtered = courses.filter(
    c => c.subject === subjectId && c.level === levelId
  );

  filtered.forEach(c => {
    const btn = document.createElement("button");
    btn.textContent = c.title;
    btn.onclick = () => startQuiz(c.id);
    app.appendChild(btn);
  });

  back(() => showLevels(subjectId));
}

/* ---------------- QUIZ ---------------- */

function startQuiz(courseId) {
  const quiz = quizzes[courseId];

  let i = 0;
  let score = 0;

  function next() {
    if (!quiz || i >= quiz.length) {
      finish(score);
      return;
    }

    const q = quiz[i];

    app.innerHTML = `<div class="card"><h2>${q.q}</h2></div>`;

    q.choices.forEach((c, index) => {
      const btn = document.createElement("button");
      btn.textContent = c;

      btn.onclick = () => {
        if (index === q.answer) score++;
        i++;
        next();
      };

      app.appendChild(btn);
    });
  }

  next();
}

/* ---------------- FIN QUIZ ---------------- */

function finish(score) {
  const gained = score * 10;
  state.xp += gained;
  saveXP();

  showLevelUp(gained);

  app.innerHTML = `
    <h2>Résultat</h2>
    <p>Score : ${score}</p>
    <p>+${gained} XP</p>
    <button onclick="(${home.toString()})()">Accueil</button>
  `;
}

/* ---------------- LEVEL UP ---------------- */

function showLevelUp(xp) {
  levelup.style.display = "block";
  levelup.textContent = "LEVEL UP + " + xp + " XP";

  setTimeout(() => {
    levelup.style.display = "none";
  }, 1200);
}

/* ---------------- BACK ---------------- */

function back(fn) {
  const btn = document.createElement("button");
  btn.textContent = "⬅ Retour";
  btn.onclick = fn;
  app.appendChild(btn);
}

/* START */
home();
