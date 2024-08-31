import React, { useState } from 'react';
import { Button, TextField, Modal, Box, Typography, Grid, Input } from '@mui/material';
import { handleUpload } from "../../../api/CloudianryApi";
import moment from 'moment';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  maxHeight: '80vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddMovieModal({ open, handleClose, handleSubmit }) {
  const [movieData, setMovieData] = useState({
    description: '',
    genre: '',
    image: '',
    language: '',
    movieName: '',
    releaseDate: '',
    revenue: '',
    trailerId: '',
  });

  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'releaseDate') {
      // Convert the date string to ISO 8601 format
      const date = new Date(value);
      setMovieData((prevData) => ({
        ...prevData,
        [name]: date.toISOString(), // Convert to ISO 8601 format
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMovieData((prevData) => ({
          ...prevData,
          image: file.name, // Store the file name or URL in the state
        }));
        setImagePreview(reader.result); // Set image preview URL
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  const submitForm = async () => {
    try {
      const uploadResult = await handleUpload(imagePreview, setImagePreview);
      await handleSubmit(movieData, uploadResult);
      // Reset form data
      setMovieData({
        description: '',
        genre: '',
        image: '',
        language: '',
        movieName: '',
        releaseDate: '',
        revenue: '',
        trailerId: '',
      });
      setImagePreview(''); // Reset image preview
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
          Add New Movie
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Movie Name"
              name="movieName"
              value={movieData.movieName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={movieData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              sx={{ mb: 2 }}
            />
            {imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt="Image Preview"
                sx={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Language"
              name="language"
              value={movieData.language}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Release Date"
              name="releaseDate"
              type="date"
              value={movieData.releaseDate ? moment(movieData.releaseDate).format('YYYY-MM-DD') : ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Trailer ID"
              name="trailerId"
              value={movieData.trailerId}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={submitForm}>
            Add Movie
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
