import Chart from 'chart.js';

const drawDiagram = async (country, param) => {
  let p;
  const c = country === 'global' ? 'all' : country;
  if (!country) return;
  if (!param) {
    p = 'cases';
  } else {
    p = param;
  }
  const response = await fetch(`https://disease.sh/v3/covid-19/historical/${c}?lastdays=all`);
  const data = await response.json();
  let dataArray = [];
  if (c === 'all') {
    dataArray = data[p];
  } else {
    dataArray = data.timeline[p];
  }
  const dataSet = Object.values(dataArray);
  const labelsArray = Object.keys(dataArray);
  const chart = document.querySelector('.diagram').getContext('2d');

  const diagramConfig = {
    type: 'bar',
    data:
    {
      labels: labelsArray,
      datasets: [{
        label: `${c}  ${p}`,
        data: dataSet,
        backgroundColor: 'rgb(237, 226, 17)',
        borderColor: 'rgb(237, 226, 17)',
      }],
    },
    options: {
      title: {
        display: true,
        text: `${c}  ${p}`,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  };
  const diagram = new Chart(chart, diagramConfig);
  diagram.update();
};

export default drawDiagram;
