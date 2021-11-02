
  //set up
  const pieData = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
//config
const pieChartconfig = {
    type: 'pie',
    data: pieData,
  };
  
  // === include 'setup' then 'config' above ===

  const pieChart = new Chart(
    document.getElementById('pieChart'),
    pieChartconfig
  );

 

  const scatterData = {
    datasets: [{
      label: 'Scatter Dataset',
      data: [{
        x: -10,
        y: 0
      }, {
        x: 0,
        y: 10
      }, {
        x: 10,
        y: 5
      }, {
        x: 0.5,
        y: 5.5
      }],
      backgroundColor: 'rgb(255, 99, 132)'
    }],
  };

  const scatterChartconfig = {
    type: 'scatter',
    data: scatterData,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };

  const scatterChart = new Chart(
    document.getElementById('scatterChart'),
    scatterChartconfig
  );