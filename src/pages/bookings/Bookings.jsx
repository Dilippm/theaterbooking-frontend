import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Grid, Button } from '@mui/material';
import { getTheatersByQuery } from '../../api/BookingApi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Seats } from '../../components/index';
import MainSeats from '../../components/seats/MainSeats';

const Bookings = () => {
  // State for search queries and data
  const [searchTheater, setSearchTheater] = useState('');
  const [searchPlace, setSearchPlace] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [theaterButtons, setTheaterButtons] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null); // State to track selected theater and its show timings
  const [seats, setSeats] = useState({ rows: 5, columns: 10 }); // Example seats configuration
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [selectedTime, setSelectedTime] = useState(null); // State for selected time
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const token = useSelector((state) => state.user?.token);



  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTheatersByQuery(searchTheater, searchPlace, id, token);
      
        setData(response);

        // Extract unique theater names and details for buttons
        const uniqueTheaters = [...new Set(response.map(item => ({
          TheaterName: item.TheaterName,
          Place: item.Place,
          ShowTimings: item.ShowTimings, // Include show timings
          Rows: item.Rows,
          Columns: item.Columns,
          Price:item.Price
        })))];
        setTheaterButtons(uniqueTheaters);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTheater, searchPlace, id, token]);

  // Handle theater button click
  const handleTheaterClick = (theater) => {
   

    if (selectedTheater?.TheaterName === theater.TheaterName) {
      // Toggle show timings visibility
      setSelectedTheater(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      // Set the selected theater and potentially update seats configuration
      setSelectedTheater(theater);
      setSeats({ rows: theater.Rows, columns: theater.Columns });
      
    }
  };

  // Format show timings to 12-hour clock style
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Generate the next 3 days from today
  const getNextThreeDays = () => {
    const today = new Date();
    const nextThreeDays = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      nextThreeDays.push(date.toDateString()); // Use toDateString() for a readable format
    }
    return nextThreeDays;
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
   
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Bookings</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search by Theater"
            variant="outlined"
            value={searchTheater}
            onChange={(e) => setSearchTheater(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search by Place"
            variant="outlined"
            value={searchPlace}
            onChange={(e) => setSearchPlace(e.target.value)}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Theaters</Typography>
      <Grid container spacing={1} mb={3}>
        {theaterButtons.map((theater, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleTheaterClick(theater)}
              style={{ textTransform: 'none', whiteSpace: 'normal', textAlign: 'left' }}
            >
              <Typography variant="body2" component="div">
                <strong>{theater.TheaterName}</strong><br />
                <span>{theater.Place}</span>
              </Typography>
            </Button>
            {selectedTheater?.TheaterName === theater.TheaterName && (
              <div style={{ padding: '8px', marginTop: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <Typography variant="subtitle1"><strong>Show Timings:</strong></Typography>
                <Grid container spacing={1}>
  {theater.ShowTimings.length > 0 ? (
    theater.ShowTimings.map((timing, idx) => (
      <Grid item key={idx}>
        <Button
          variant="outlined"
          color={selectedTime === timing ? "success" : "primary"}
          style={{
            margin: '4px',
            backgroundColor: selectedTime === timing ? '#4caf50' : '', // Green background for selected time
            color: selectedTime === timing ? 'white' : '', // White text color for better visibility
          }}
          onClick={() => handleTimeSelect(timing)}
          size="small"
        >
          {formatTime(timing)}
        </Button>
      </Grid>
    ))
  ) : (
    <Typography variant="body2">No show timings available.</Typography>
  )}
</Grid>

                {/* Display the next 3 days */}
                <Typography variant="subtitle1" style={{ marginTop: '16px' }}><strong>Upcoming Dates:</strong></Typography>
                <Grid container spacing={1}>
  {getNextThreeDays().map((date, idx) => (
    <Grid item key={idx}>
      <Button
        variant="outlined"
        color={selectedDate === date ? "success" : "primary"}
        style={{
          margin: '4px',
          backgroundColor: selectedDate === date ? '#4caf50' : '', // Green background for selected date
          color: selectedDate === date ? 'white' : '', // White text color for better visibility
        }}
        onClick={() => handleDateSelect(date)}
        size="small"
      >
        {date}
      </Button>
    </Grid>
  ))}
</Grid>

              </div>
            )}
          </Grid>
        ))}
      </Grid>

      {/* Render the Seats component only if a theater is selected */}
      {selectedTheater && (
        <MainSeats rows={seats.rows} columns={seats.columns} time={selectedTime} date={selectedDate} theater = {selectedTheater}/>
       
      )}
    </Container>
  );
};

export default Bookings;
