import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setBookedSeats } from '../../redux/userSlice';
import {bookTicket,getBookedSeats} from "../../api/BookingApi"
import { useNavigate } from 'react-router-dom';
const BookingDetails = ({ selectedSeats,totalPrice, time, date, theater,movie }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.token);
  const id = useSelector((state) => state.user?.user?.id);
  const navigate = useNavigate()
const credentials = {
  "theater":theater.TheaterName,
  "selectedSeats":selectedSeats,
  "time":time,
  "date":date,
  "user":id,
  "price":`${totalPrice}`,
  "movie": movie
}
  // Click handler for the "Book Now" button
  const handleBookNowClick = async () => {
    try {
      await bookTicket(credentials, token);
    const response =   await getBookedSeats(time,date,token)
     // Extract and deduplicate the selected seats
    const allSelectedSeats = response.flatMap(item => item.SelectedSeats);
   
    const uniqueSelectedSeats = [...new Set(allSelectedSeats)];
  
   
    navigate(`/bookings/payment/${totalPrice}`, { state: { credentials } });
    } catch (error) {
      console.error("Error booking the ticket:", error);
      // Handle the error here, such as showing an error message to the user.
    }
  };
  
  const formatTime = (isoTime) => {
    if (!isoTime) return 'N/A';
  
    const date = new Date(isoTime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${formattedMinutes} ${ampm}`;
  };
  
  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginBottom: '24px' }}>
        Booking Details
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={<Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Theater</Typography>}
            secondary={theater?.TheaterName || 'N/A'}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={<Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Movie</Typography>}
            secondary={movie || ''}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={<Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Location</Typography>}
            secondary={theater?.Place || 'N/A'}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={<Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Date</Typography>}
            secondary={date || 'N/A'}
          />
        </ListItem>
        <Divider />
        <ListItem>
        <ListItemText
            primary={<Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Time</Typography>}
            secondary={formatTime(time) || 'N/A'}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={<Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Selected Seats</Typography>}
            secondary={selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={<Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Total Price:</Typography>}
            secondary={totalPrice || '0'}
          />
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '24px' }}
        onClick={handleBookNowClick}
      >
        Book Now
      </Button>
    </div>
  );
};

export default BookingDetails;
