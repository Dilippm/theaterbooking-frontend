import React, { useState } from 'react';
import { Grid, Paper } from '@mui/material';
import Seats from './Seats';
import BookingDetails from './BookingDetails';

const MainSeats = ({ rows, columns, time, date, theater,movie }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State to track total price
 
  // Handle seat selection
  const handleSeatClick = (seat, price) => {
    setSelectedSeats((prevSelectedSeats) => {
      const isSeatSelected = prevSelectedSeats.includes(seat);

      if (isSeatSelected) {
        // If the seat is already selected, remove it and subtract its price
        setTotalPrice(prevTotal => prevTotal - price);
        return prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat);
      } else {
        // If the seat is not selected, add it and add its price
        setTotalPrice(prevTotal => prevTotal + price);
        return [...prevSelectedSeats, seat];
      }
    });
  };

  return (
    <Grid container spacing={2} sx={{ width: '100%', padding: '16px', boxSizing: 'border-box' }}>
      {/* Seats Component Section */}
      <Grid
        item
        xs={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          boxSizing: 'border-box',
          border: '2px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', padding: '16px' }}>
          <Seats
            rows={rows}
            columns={columns}
            selectedSeats={selectedSeats}
            price={theater.Price}
            handleSeatClick={handleSeatClick}
            time={time}
            date={date}
          />
        </Paper>
      </Grid>

      {/* BookingDetails Component Section */}
      <Grid
        item
        xs={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '16px',
          boxSizing: 'border-box',
          border: '2px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', padding: '16px', height: '100%' }}>
          <BookingDetails
            selectedSeats={selectedSeats}
            totalPrice={totalPrice} // Pass total price to BookingDetails
            time={time}
            date={date}
            theater={theater}
            movie ={movie}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainSeats;
