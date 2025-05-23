function calculateResults() {
  const form = document.getElementById('quiz-form');
  const formData = new FormData(form);

  let total = 0;
  let answered = 0;

  form.querySelectorAll(".question").forEach(question => {
    const name = question.querySelector("input[type=radio]").name;
    const selected = formData.get(name);
    if (!selected) return;
    total += parseInt(selected);
    answered++;
  });

  if (answered === 0) return;

  const score = ((total + answered) / (2 * answered)) * 100;

  document.getElementById('gauge-wrapper').style.display = 'block';
  document.getElementById('gauge-fill-left').style.width = `${score}%`;
  document.getElementById('gauge-fill-right').style.width = `${100 - score}%`;
}
