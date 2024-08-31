import React, { useState, useEffect } from 'react';
import { Button, TextField, Modal, Box, Typography, Grid, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getMovies } from '../../api/movieApi'; // Import your API function to fetch movies
import Autocomplete from '@mui/material/Autocomplete';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  maxHeight: '80vh', // Set a maximum height for the modal
  overflow: 'auto', // Enable scrolling if content overflows
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddTheaterModal({ open, handleClose, handleSubmit }) {
  const id = useSelector((state) => state.user?.user?.id);
 
  const token = useSelector((state)=>state?.user?.token)
  const [theaterData, setTheaterData] = useState({
    ownerId: id,
    theaterName: '',
    seats: '',
    rows: '',
    columns: '',
    prices: [{ name: '', amount: '' }], // Array of price objects
    showTimings: [''], // Array of time strings initialized to empty strings
    place: '',
    state: '',
    movie: '', // Movie field
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies when the modal opens
    if (open) {
      fetchMoviesList();
    }
  }, [open]);

  const fetchMoviesList = async () => {
    try {
      const moviesList = await getMovies(token); // Assuming fetchMovies returns a list of movies
    
      const movieNames = moviesList.map((movie) => ({
        id: movie.ID,
        MovieName: movie.MovieName,
      }));
      setMovies(movieNames);
    
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleChange = (e) => {
  
    const { name, value } = e.target;
   
    setTheaterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPrices = theaterData.prices.map((price, i) =>
      i === index ? { ...price, [name]: value } : price
    );
    setTheaterData((prevData) => ({
      ...prevData,
      prices: updatedPrices,
    }));
  };

  const addPriceField = () => {
    setTheaterData((prevData) => ({
      ...prevData,
      prices: [...prevData.prices, { name: '', amount: '' }],
    }));
  };

  const removePriceField = (index) => {
    setTheaterData((prevData) => ({
      ...prevData,
      prices: prevData.prices.filter((_, i) => i !== index),
    }));
  };

  const handleShowTimingsChange = (index, e) => {
    const updatedTimings = [...theaterData.showTimings];
    updatedTimings[index] = e.target.value;
    setTheaterData((prevData) => ({
      ...prevData,
      showTimings: updatedTimings,
    }));
  };

  const addShowTimingField = () => {
    setTheaterData((prevData) => ({
      ...prevData,
      showTimings: [...prevData.showTimings, ''], // Add a new time slot with empty string
    }));
  };

  const removeShowTimingField = (index) => {
    setTheaterData((prevData) => ({
      ...prevData,
      showTimings: prevData.showTimings.filter((_, i) => i !== index),
    }));
  };

  const formatTime = (time) => moment(time, 'HH:mm').format('HH:mm');

  const submitForm = async () => {
    try {
    
      await handleSubmit(theaterData);
      // Reset form data
      setTheaterData({
        theaterName: '',
        OwnerId: id,
        place: '',
        state: '',
        movie: '', // Reset movie field
        rows: '',
        columns: '',
        seats: '',
        prices: [{ name: '', amount: '' }],
        showTimings: ['']
      });
      // Close the modal
      handleClose();
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Theater
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Theater Name"
              name="theaterName"
              value={theaterData.theaterName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Seats"
              name="seats"
              value={theaterData.seats}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Rows"
              name="rows"
              value={theaterData.rows}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Columns"
              name="columns"
              value={theaterData.columns}
              onChange={handleChange}
            />
          </Grid>
          {theaterData.prices.map((price, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Price Name"
                  name="name"
                  value={price.name}
                  onChange={(e) => handlePriceChange(index, e)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Price Amount"
                  name="amount"
                  type="number"
                  value={price.amount}
                  onChange={(e) => handlePriceChange(index, e)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton color="secondary" onClick={() => removePriceField(index)}>
                  <Remove />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" color="primary" onClick={addPriceField} startIcon={<Add />}>
            Add Price
          </Button>
          <Grid item xs={12} sx={{ mt: 0 }}>
            {theaterData.showTimings.map((time, index) => (
              <Grid container spacing={2} sx={{ mt: 1 }} key={index}>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    type="time"
                    value={formatTime(time)}
                    onChange={(e) => handleShowTimingsChange(index, e)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }} // 5 min intervals
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton color="secondary" onClick={() => removeShowTimingField(index)}>
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button variant="outlined" color="primary" onClick={addShowTimingField} startIcon={<Add />}>
              Add Show Timing
            </Button>
          </Grid>
          <Grid item xs={12}>
  <Autocomplete
    value={movies.find(movie => movie.id === theaterData.movie) || null} // Find the selected movie object
    onChange={(event, newValue) => {
      setTheaterData((prevData) => ({
        ...prevData,
        movie: newValue ? newValue.id : '', // Use the movie ID for value
      }));
    }}
    inputValue={theaterData.movieName || ''} // Bind to inputValue for custom typing
    onInputChange={(event, newInputValue) => {
      setTheaterData((prevData) => ({
        ...prevData,
        movieName: newInputValue, // Update movieName as user types
      }));
    }}
    options={movies}
    getOptionLabel={(option) => option.MovieName}
    isOptionEqualToValue={(option, value) => option.id === value.id}
    freeSolo
    renderInput={(params) => <TextField {...params} label="Movie" />}
  />
</Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Place"
              name="place"
              value={theaterData.place}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={theaterData.state}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={submitForm}>
            Add Theater
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
