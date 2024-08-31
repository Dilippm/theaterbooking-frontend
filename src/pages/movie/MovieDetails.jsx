import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, Paper, ButtonGroup } from '@mui/material';
import { getMovieById } from '../../api/movieApi'; // Ensure this function is properly defined
import { useSelector } from 'react-redux';
import { MovieTrailerPlayer } from '../../components/index';

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const token = useSelector((state) => state.user?.token);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieById(id, token); // Fetch movie details by ID
        setMovie(movieData);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      }
    };

    fetchMovie();
  }, [id, token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Format the release date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '16px', textAlign: 'center' }}>
            <img
              src={movie.Image || 'default-movie-poster.jpg'}
              alt={movie.MovieName}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {movie.MovieName}
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            <strong>Description:</strong> {movie.Description}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Release Date:</strong> {formatDate(movie.ReleaseDate)}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Genre:</strong> {movie.Genre}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Language:</strong> {movie.Language}
          </Typography>
          <ButtonGroup variant="text" aria-label="text button group" style={{ marginTop: '16px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowTrailer(!showTrailer)} // Show trailer on button click
              style={{ marginRight: '8px' }} // Add right margin to the first button
            >
              Watch Trailer
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/bookings/theaterbooking/${movie.ID}`)} // Handle booking logic
            >
              Book Now
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      {showTrailer && (
        <div style={{ width: '100%', marginTop: '16px' }}>
          <MovieTrailerPlayer videoId={movie.TrailerId} /> 
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
