function calculateResults() {
  Chart.register(window['chartjs-plugin-annotation']);
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
        legend: { display: false },
        annotation: {
          annotations: {
            quadrant1: {
              type: 'box',
              xMin: 0,
              xMax: 1,
              yMin: 0,
              yMax: 1,
              backgroundColor: 'rgba(255, 99, 132, 0.1)' // top-right (Traditional + Statist)
            },
            quadrant2: {
              type: 'box',
              xMin: -1,
              xMax: 0,
              yMin: 0,
              yMax: 1,
              backgroundColor: 'rgba(255, 205, 86, 0.1)' // top-left (Progressive + Statist)
            },
            quadrant3: {
              type: 'box',
              xMin: -1,
              xMax: 0,
              yMin: -1,
              yMax: 0,
              backgroundColor: 'rgba(75, 192, 192, 0.1)' // bottom-left (Progressive + Individualist)
            },
            quadrant4: {
              type: 'box',
              xMin: 0,
              xMax: 1,
              yMin: -1,
              yMax: 0,
              backgroundColor: 'rgba(54, 162, 235, 0.1)' // bottom-right (Traditional + Individualist)
            },
            centerX: {
              type: 'line',
              borderColor: 'black',
              borderWidth: 2,
              scaleID: 'x',
              value: 0
            },
            centerY: {
              type: 'line',
              borderColor: 'black',
              borderWidth: 2,
              scaleID: 'y',
              value: 0
            }
          }
        }
      },
      scales: {
        x: {
          min: -1,
          max: 1,
          ticks: { display: false },
          title: { display: true, text: 'Progressive ←→ Traditional' },
          grid: {
            color: ctx => ctx.tick.value === 0 ? '#000' : '#ccc',
            lineWidth: ctx => ctx.tick.value === 0 ? 2 : 1
          }
        },
        y: {
          min: -1,
          max: 1,
          ticks: { display: false },
          title: { display: true, text: 'Individualist ↑↓ Statist' },
          grid: {
            color: ctx => ctx.tick.value === 0 ? '#000' : '#ccc',
            lineWidth: ctx => ctx.tick.value === 0 ? 2 : 1
          }
        }
      }
    },
    plugins: [Chart.registry.getPlugin('annotation')]
  });
}
