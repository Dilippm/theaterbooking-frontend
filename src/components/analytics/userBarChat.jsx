// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register components for ChartJS
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const UserBarChart = ({ data }) => {
  console.log(data)
  // Check if data contains Movie or Theater
  const hasMovie = data.some(item => item.Movie);
  const title = hasMovie ? 'Most Booked Movies' : 'Most Visited Theaters'
// Define color schemes for movies and theaters
const movieColors = ['#FFD433','#33FF57', '#FF33F6'];  // Bright Orange, Bright Green, Sky Blue, Bright Pink, Bright Yellow

const theaterColors =  ['#d32f2f',  '#ffb74d',   '#F5F5DC'];

// Assign colors based on whether it's movie or theater data
const barColors = hasMovie ? movieColors : theaterColors;


  // Prepare data for the chart
  const chartData = {
    labels: data.map(item => item.Theater || item.Movie),
    datasets: [
      {
        label: 'Visit Count',
        data: data.map(item => item.Count),
        backgroundColor: data.map((_, index) => barColors[index % barColors.length]), // Assign colors from the array
        borderColor: 'rgba(0, 0, 0, 0.5)', // Optional: border color for bars
        borderWidth: 1,
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
          label: function(tooltipItem) {
            return `Visits: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#fff', // White color for x-axis labels
        },
        grid: {
          color: '#333', // Optional: color for x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff', // White color for y-axis labels
        },
        grid: {
          color: '#333', // Optional: color for y-axis grid lines
        },
      },
    },
  };

  return (
    <Card sx={{ padding: 2, backgroundColor: '#004d00', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2, color: '#b0b0b0', fontWeight: 'bold' }}>
       {title}
        </Typography>
        <div style={{ height: '300px', width: '100%' }}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBarChart;
