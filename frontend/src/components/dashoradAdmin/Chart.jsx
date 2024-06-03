import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ type, data }) => {
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Chart;
