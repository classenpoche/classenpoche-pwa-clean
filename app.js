function go(screenId) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });

  document.getElementById(screenId).classList.add('active');
}

function openQuiz(name) {
  go('quiz');

  const title = document.getElementById('quiz-title');
  const content = document.getElementById('quiz-content');

  if (name === 'maths') {
    title.textContent = "Quiz Maths";
    content.textContent = "Questions de mathématiques à venir...";
  }

  if (name === 'francais') {
    title.textContent = "Quiz Français";
    content.textContent = "Questions de français à venir...";
  }

  if (name === 'histoire') {
    title.textContent = "Quiz Histoire";
    content.textContent = "Questions d'histoire à venir...";
  }
}
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  showInstallButton();
});

function showInstallButton() {
  const btn = document.createElement("button");
  btn.textContent = "⬇ Installer l'app";
  btn.className = "big-btn";
  btn.style.background = "#27ae60";

  btn.onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      btn.remove();
    }
  };

  document.body.appendChild(btn);
}
let progress = JSON.parse(localStorage.getItem("progress") || "{}");

function getLevel(subject) {
  return progress[subject]?.level || 1;
}

function addXP(subject, xp) {
  if (!progress[subject]) {
    progress[subject] = { xp: 0, level: 1, badges: [] };
  }

  progress[subject].xp += xp;

  if (progress[subject].xp >= progress[subject].level * 100) {
    progress[subject].level++;
    progress[subject].xp = 0;

    showLevelUp(progress[subject].level);
    unlockBadge(subject);
  }

  localStorage.setItem("progress", JSON.stringify(progress));
}
