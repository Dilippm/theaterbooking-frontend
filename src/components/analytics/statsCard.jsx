// src/components/StatsCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const StatsCard = ({ title, value }) => {
  return (
    <Card sx={{ backgroundColor: '#004d00', padding: 2, boxShadow: 3, display:'flex', justifyContent:'center' }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: '#b0b0b0', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color: '#ffffff' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
