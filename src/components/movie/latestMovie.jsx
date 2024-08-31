import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LatestMovie = ({ movies }) => {
  const navigate = useNavigate();

  function handleOnclick(id) {
    // Navigate to the movie details page with the movie ID
    navigate(`/movies/moviedetails/${id}`);
  }

  return (
    <div style={{ height: '200px' }}>
      <Grid container spacing={1}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid item xs={12} sm={4} key={movie.ID}>
              <Card style={{ height: '200px', width: '200px', position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={movie.Image || 'default-movie-poster.jpg'}
                  alt={movie.MovieName}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1,
                    opacity: 0.6, // Slightly dim the background image
                  }}
                />
                <CardContent
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Typography variant="h6" component="div" style={{ marginBottom: '8px' }}>
                    {movie.MovieName}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    onClick={() => handleOnclick(movie.ID)} // Pass a function reference
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No movies found</Typography>
        )}
      </Grid>
    </div>
  );
};

export default LatestMovie;
