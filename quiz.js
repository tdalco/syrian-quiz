function calculateResults() {
  const form = document.getElementById('quiz-form');
  const formData = new FormData(form);

  let axes = { tradition: 0, statism: 0 };
  let counts = { tradition: 0, statism: 0 };

  form.querySelectorAll(".question").forEach(question => {
    const axis = question.getAttribute("data-axis");
    const input = question.querySelector("input[type='radio']");
    const name = input.name;
    const value = formData.get(name);

    if (value !== null) {
      axes[axis] += parseInt(value);
      counts[axis]++;
    }
  });

  const x = axes.tradition / counts.tradition;
  const y = axes.statism / counts.statism;

  const chartEl = document.getElementById('compassChart').getContext('2d');
  document.getElementById('chart-wrapper').style.display = 'block';

  if (window.myCompassChart) {
    window.myCompassChart.destroy();
  }

  window.myCompassChart = new Chart(chartEl, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Your Position',
        data: [{ x: x, y: y }],
        backgroundColor: '#377eb8',
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          min: -1,
          max: 1,
          title: { display: true, text: 'Progressive ←→ Traditional' },
          ticks: { stepSize: 0.5 }
        },
        y: {
          min: -1,
          max: 1,
          title: { display: true, text: 'Individualist ↑↓ Statist' },
          ticks: { stepSize: 0.5 }
        }
      }
    }
  });
}
