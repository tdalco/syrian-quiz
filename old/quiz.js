function calculateResults() {
  const form = document.getElementById('quiz-form');
  const formData = new FormData(form);

  let axes = {};

  // Gather scores by reading selected radio inputs
  form.querySelectorAll(".question").forEach(question => {
    const axis = question.getAttribute("data-axis");
    const name = question.querySelector("input[type=radio]").name;
    const selected = formData.get(name);

    if (!selected) return; // Skip unanswered

    if (!axes[axis]) axes[axis] = 0;
    axes[axis] += parseInt(selected);
  });

  // Normalize: -6 to +6 becomes 0–100
  const normalize = (score, total) => ((score + total) / (2 * total)) * 100;

  const labels = [];
  const values = [];

  for (let axis in axes) {
    labels.push(axis.charAt(0).toUpperCase() + axis.slice(1));
    values.push(normalize(axes[axis], 6)); // 6 questions in religion axis
  }

  // Show chart canvas
  document.getElementById('resultsChart').style.display = 'block';

  // Render horizontal bar chart
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
      indexAxis: 'y',
      responsive: true,
      scales: {
        x: {
          min: 0,
          max: 100,
          grid: { display: false },
          ticks: {
            display: false // hide numeric values
          },
          title: {
            display: true,
            text: 'Secular ←——————————————————————→ Religious',
            font: { size: 14 }
          }
        },
        y: {
          grid: { display: false },
          ticks: {
            font: { size: 16 }
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}
