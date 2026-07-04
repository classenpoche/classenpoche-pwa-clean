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
