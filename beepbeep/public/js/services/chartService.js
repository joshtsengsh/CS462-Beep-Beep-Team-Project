
// Setup - The visuals and dataset
const pieData = {
    labels: [
        'Present',
        'Absent',
        'Fever'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [75, 5, 10],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};

// Config
const pieChartconfig = {
    type: 'pie',
    data: pieData,
};

// Display the chart
const pieChart = new Chart(
    document.getElementById('pieChart'),
    pieChartconfig
);



