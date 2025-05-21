function calculateResults() {
  const form = document.getElementById('quiz-form');
  const formData = new FormData(form);

  let axes = {
    religion: 0,
    sovereignty: 0
  };

  axes.religion += parseInt(formData.get('religion1'));
  axes.sovereignty += parseInt(formData.get('sovereignty1'));

  // Normalize to 0–100 scale (–2 to 2 becomes 0 to 100)
  const normalize = score => ((score + 2) / 4) * 100;

  const data = {
    labels: ['Religious vs. Secular', 'Sovereignty vs. Strategic Realism'],
    datasets: [{
      label: 'Your Result',
      data: [normalize(axes.religion), normalize(axes.sovereignty)],
      backgroundColor: ['#a00', '#048']
    }]
  };

  document.getElementById('resultsChart').style.display = 'block';

  new Chart(document.getElementById('resultsChart'), {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: { min: 0, max: 100 }
      }
    }
  });
}
