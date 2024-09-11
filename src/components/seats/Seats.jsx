import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { getBookedSeats,getReservedSeats } from '../../api/BookingApi';
import { useSelector, useDispatch } from 'react-redux';
import { setBookedSeats,setReservedSeats } from '../../redux/userSlice';
const Seats = ({ rows, columns, selectedSeats, price, handleSeatClick, time, date }) => {
  console.log(time,date)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.token);
  const bookedSeats = useSelector((state) => state.user.bookedSeats);
const reservedSeats = useSelector((state)=> state.user.reservedSeats)
console.log("hai:",reservedSeats)
  // Create an array of rows and columns for rendering
  const seatGrid = Array.from({ length: rows }, (_, rowIndex) => (
    Array.from({ length: columns }, (_, colIndex) => `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`)
  ));

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await getBookedSeats(time, date, token);
 
        // Extract and deduplicate the selected seats
        const allSelectedSeats = response?.flatMap(item => item.SelectedSeats);
       
        const uniqueSelectedSeats = [...new Set(allSelectedSeats)];
      
         dispatch(setBookedSeats(uniqueSelectedSeats));
         const bookedresponse = await getReservedSeats(time, date, token);
   console.log("booked:",bookedresponse)
         // Extract and deduplicate the selected seats
         const allBookedSelectedSeats = bookedresponse?.flatMap(item => item.SelectedSeats);
        
         const uniqueBookedSeats = [...new Set(allBookedSelectedSeats)];
       
          dispatch(setReservedSeats(uniqueBookedSeats));
      } catch (error) {
        console.error('Failed to fetch booked seats:', error);
      }
    };

    fetchBookedSeats();
  }, [time, date, token]);

  const isVIP = (rowIndex) => {
    if (price.VIP && !price.Regular) {
      return true;
    }
    if (!price.VIP && price.Regular) {
      return false;
    }
    return rowIndex >= rows - 2;
  };

  const getSeatPrice = (rowIndex) => {
    return isVIP(rowIndex) ? price.VIP : price.Regular;
  };

  return (
    <div
      style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>Screen This Way</Typography>
      <Grid container spacing={1} style={{ width: '100%' }}>
        {seatGrid.map((row, rowIndex) => (
          <Grid item xs={12} key={rowIndex} style={{ width: '100%' }}>
            <Grid container spacing={1} justifyContent="center" style={{ width: '100%' }}>
              {row.map((seat) => (
                <Grid item key={seat} xs={1} style={{ width: 'auto' }}>
                  <Paper
                    elevation={3}
                    onClick={() => !bookedSeats.includes(seat) && !reservedSeats.includes(seat) && handleSeatClick(seat, getSeatPrice(rowIndex))}
                    style={{
                      width: '100%',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      backgroundColor: reservedSeats.includes(seat)
                      ? 'red' // Red color for reserved seats
                      : bookedSeats.includes(seat)
                      ? '#8B4513' // Brown color for booked seats
                      : selectedSeats.includes(seat)
                      ? 'green' // Green color for selected seats
                      : isVIP(rowIndex)
                      ? '#ffd700' // Gold color for VIP seats
                      : '#e0e0e0', // Gray color for other seats
                      color: selectedSeats.includes(seat) || bookedSeats.includes(seat) ? 'white' : 'black',
                      textAlign: 'center',
                      fontSize: '12px',
                      cursor: bookedSeats.includes(seat) ? 'not-allowed' : 'pointer', // Not clickable for booked seats
                    }}
                  >
                    {seat}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Seats;
