// // src/PieChart.js
// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = ({ data, title }) => {
//   const chartData = {
//     labels: Object.keys(data),
//     datasets: [
//       {
//         label: 'Alerts',
//         backgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40',
//           '#C9CBCF',
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56'
//         ],
//         hoverBackgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40',
//           '#C9CBCF',
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56'
//         ],
//         data: Object.values(data),
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           boxWidth: 20,
//           padding: 20,
//         }
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const label = context.label || '';
//             const value = context.raw || 0;
//             const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
//             const percentage = ((value / total) * 100).toFixed(2);
//             return `${label}: ${value} (${percentage}%)`;
//           }
//         }
//       },
//       title: {
//         display: true,
//         text: title,
//         font: {
//           size: 20
//         }
//       },
//     },
//   };

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <Pie data={chartData} options={options} />
//     </div>
//   );
// };

// export default PieChart;

// src/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Alerts',
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        data: Object.values(data),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 20,
          color: 'white', // Set legend text color to white
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
          color: 'white', // Set title text color to white
        }
      },
    },
    // Set chart background color to dark
    plugins: {
      title: {
        color: '#fff',
      },
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
