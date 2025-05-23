function calculateResults() {
  const form = document.getElementById('quiz-form');
  const formData = new FormData(form);

  let axes = {};

  // Gather scores per axis
  form.querySelectorAll("select").forEach(select => {
    const axis = select.getAttribute("data-axis");
    const value = parseInt(formData.get(select.name));

    if (!axes[axis]) axes[axis] = 0;
    axes[axis] += value;
  });

  // Normalize scores to a 0–100 scale
  const normalize = (score, totalQuestions) => ((score + totalQuestions) / (2 * totalQuestions)) * 100;

  const labels = [];
  const values = [];

  for (let axis in axes) {
    labels.push(axis.charAt(0).toUpperCase() + axis.slice(1));
    values.push(normalize(axes[axis], 6));  // 6 questions for 'religion' axis
  }

  // Show the chart
  document.getElementById('resultsChart').style.display = 'block';

  new Chart(document.getElementById('resultsChart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Your Result',
        data: values,
        backgroundColor: '#377eb8'
      }]
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 100
        }
      }
    }
  });
}
