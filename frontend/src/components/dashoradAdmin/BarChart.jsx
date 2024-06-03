import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function BarChart({ data }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Users by Role',
        data: Object.values(data),
        backgroundColor: '#007bff',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
