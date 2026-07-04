function startQuiz(courseId) {
  const quiz = quizzes[courseId];

  if (!quiz) {
    app.innerHTML = "<p>Quiz introuvable</p>";
    return;
  }

  let i = 0;
  let score = 0;

  function showQuestion() {
    if (i >= quiz.length) {
      finishQuiz(score);
      return;
    }

    const q = quiz[i];

    app.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h2>${q.q}</h2>`;
    app.appendChild(card);

    q.choices.forEach((c, index) => {
      const btn = document.createElement("button");
      btn.textContent = c;

      btn.onclick = () => {
        if (index === q.answer) score++;
        i++;
        showQuestion();
      };

      app.appendChild(btn);
    });
  }

  showQuestion();
}
