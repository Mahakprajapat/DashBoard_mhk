

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import './App.css'; // Import the CSS file

// // Register the components with Chart.js
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend
// );

// function App() {
//   const [jsonData, setJsonData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/eve.json');
//         setJsonData(response.data);
//       } catch (error) {
//         console.error('Error fetching JSON data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   if (!jsonData.length) {
//     return <div>Loading...</div>;
//   }

//   const alertCounts = jsonData.reduce((counts, entry) => {
//     if (entry.event_type === 'alert') {
//       const signature = entry.alert.signature;
//       counts[signature] = (counts[signature] || 0) + 1;
//     }
//     return counts;
//   }, {});

//   const chartData = {
//     labels: Object.keys(alertCounts),
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
//         data: Object.values(alertCounts),
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
//         text: 'Alerts by Signature',
//         font: {
//           size: 20
//         }
//       },
//     },
//   };

//   return (
//     <div className="chart-container">
//       <h1> Dashboard</h1>
//       <h1>Alerts by Signature</h1>
//       <div style={{ width: '100%', height: '100%' }}>
//         <Pie data={chartData} options={options} />
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart from './PieChart';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/eve.json');
        setJsonData(response.data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
    fetchData();
  }, []);

  if (!jsonData.length) {
    return <div>Loading...</div>;
  }

  const processData = (data, key) => {
    return data.reduce((counts, entry) => {
      if (entry.event_type === 'alert') {
        const value = entry.alert[key];
        counts[value] = (counts[value] || 0) + 1;
      }
      return counts;
    }, {});
  };

  const alertCategoryData = processData(jsonData, 'category');
  const alertSignatureData = processData(jsonData, 'signature');
  const alertSeverityData = processData(jsonData, 'severity');

  return (
    <div className="chart-container">
      <h1>Dashboard</h1>
      <div className="charts-wrapper">
        <div className="chart-item">
          <PieChart data={alertCategoryData} title="Alerts by Category" />
        </div>
        <div className="chart-item">
          <PieChart data={alertSignatureData} title="Alerts by Signature" />
        </div>
        <div className="chart-item">
          <PieChart data={alertSeverityData} title="Alerts by Severity" />
        </div>
      </div>
    </div>
  );
}

export default App;

