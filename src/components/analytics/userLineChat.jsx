import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Register components for ChartJS
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const UserLineChart = ({ data }) => {
 
  
  // Transform the data into the format needed for Chart.js
  const labels = data.map(item => item.Month);
  const counts = data.map(item => item.Count);

  // Prepare data for the chart
  const chartData = {
    labels: labels, // Extract months/years from the data object
    datasets: [
      {
        label: 'Count',
        data: counts, // Extract counts from the data object
        borderColor: '#FF5733', // Blood red color for the line
        backgroundColor: 'rgba(255, 87, 51, 0.3)', // Light blood red color for the background
        fill: true, // Fill area under the line
        tension: 0.1, // Smooth line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff', // White color for legend labels
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Count: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: false,
        ticks: {
          color: '#fff', // White color for x-axis labels
        },
        grid: {
          color: '#333', // Color for x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff', // White color for y-axis labels
        },
        grid: {
          color: '#333', // Color for y-axis grid lines
        },
      },
    },
  };

  return (
    <Card sx={{ padding: 2, backgroundColor: '#004d00', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2, color: '#b0b0b0', fontWeight: 'bold' }}>
         Monthly Bookings
        </Typography>
        <div style={{ height: '300px', width: '100%' }}>
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserLineChart;
