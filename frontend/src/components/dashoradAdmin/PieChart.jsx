import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function PieChart({ data }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Projects by Status',
        data: Object.values(data),
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={options} />;
}

export default PieChart;
