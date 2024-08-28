import React, { useState, useEffect } from 'react';
import { Button, TextField, Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

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

export default function UpdateTheaterModal({ open, handleClose, handleUpdate, initialData }) {
  const id = useSelector((state) => state.user?.user?.id);
  
  const [theaterData, setTheaterData] = useState({
   
    TheaterName: initialData.TheaterName,
    Seats: initialData.Seats,
    Rows: initialData.Rows,
    Columns: initialData.Columns,
    Price: Object.entries(initialData.Price).map(([name, amount]) => ({ name, amount })), // Convert object to array
    ShowTimings: initialData.ShowTimings, // Array of time strings initialized to empty strings
    Place: initialData.Place,
    State: initialData.State,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheaterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPrices = theaterData.Price.map((price, i) =>
      i === index ? { ...price, [name]: value } : price
    );
    setTheaterData((prevData) => ({
      ...prevData,
      Price: updatedPrices,
    }));
  };

  const addPriceField = () => {
    setTheaterData((prevData) => ({
      ...prevData,
      Price: [...prevData.Price, { name: '', amount: '' }],
    }));
  };

  const removePriceField = (index) => {
    setTheaterData((prevData) => ({
      ...prevData,
      Price: prevData.Price.filter((_, i) => i !== index),
    }));
  };

  const handleShowTimingsChange = (index, e) => {
    const timeValue = e.target.value;
    console.log("time:",timeValue)
    const formattedTime = new Date(`1970-01-01T${timeValue}:00.000Z`).toISOString();
    console.log(formattedTime)
    const updatedTimings = [...theaterData.ShowTimings];
    updatedTimings[index] = formattedTime;
  
    setTheaterData((prevData) => ({
      ...prevData,
      ShowTimings: updatedTimings,
    }));
  };

  const addShowTimingField = () => {
    setTheaterData((prevData) => ({
      ...prevData,
      ShowTimings: [...prevData.ShowTimings, ''], // Add a new time slot with empty string
    }));
  };

  const removeShowTimingField = (index) => {
    setTheaterData((prevData) => ({
      ...prevData,
      ShowTimings: prevData.ShowTimings.filter((_, i) => i !== index),
    }));
  };

  const formatTime = (time) => moment(time, 'HH:mm').format('HH:mm');

  const submitForm = async () => {
    try {
        const updatedPrice = theaterData.Price.reduce((acc, { name, amount }) => {
            acc[name] = parseFloat(amount); // Convert amount to float
            return acc;
          }, {});
      const formattedData = {
        ...theaterData,
      Price: updatedPrice
      };
      await handleUpdate(formattedData);
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
          Update Theater
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Theater Name"
              name="TheaterName"
              value={theaterData.TheaterName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Seats"
              name="Seats"
              value={theaterData.Seats}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Rows"
              name="Rows"
              value={theaterData.Rows}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Columns"
              name="Columns"
              value={theaterData.Columns}
              onChange={handleChange}
            />
          </Grid>
          {theaterData.Price.map((price, index) => (
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
            {theaterData.ShowTimings.map((time, index) => (
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Place"
              name="Place"
              value={theaterData.Place}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="State"
              name="State"
              value={theaterData.State}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={submitForm}>
            Update Theater
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
