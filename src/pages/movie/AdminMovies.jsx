import React, { useState } from 'react';
import { MovieTable } from '../../components'
import { Button } from '@mui/material';
import AddMovieModal from '../../components/movie/movieModal/addMovie';
import { addMovie } from '../../api/movieApi';
import { useSelector} from 'react-redux';
const styles = {
  container: {
    backgroundColor: '#e0f2f1', // Light green shade
    padding: '20px',
    minHeight: '100vh',
    position: 'relative',
  },
  button: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color:'white',
    backgroundColor:'black'
  },
  tableContainer: {
    marginTop: '60px', // Space to ensure the table is below the button
  },
};
const AdminMovies = () => {
  const token = useSelector((state) => state.user?.token);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const [movierefresh, setMovieRefresh] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async(movieData,uploadResult) => {
    try {
    
     
      const formattedData = {
        movieName: movieData.movieName,
        description: movieData.description,
        language: movieData.language,
        releaseDate: movieData.releaseDate,
        genre: movieData.genre,
        image: uploadResult,
        trailerId: movieData.trailerId,
      };
  console.log("for:",formattedData)
      // // Call the API with the formatted data
      const response = await addMovie(formattedData, token);
     
      setMovieRefresh(prev => !prev); // Toggle the refresh state
      console.log('movie added successfully:', response);
    } catch (error) {
      setError('Error adding movie. Please try again later.');
      console.error('Error adding movie:', error);
    }
  }
  return (
    <div style={styles.container}>
    <Button
      variant="contained"
    
     onClick={handleOpen}
      style={styles.button}
    >
      Add  Movie
    </Button>
    <AddMovieModal
        open={modalOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    <div style={styles.tableContainer}>
    <MovieTable refresh={movierefresh}  />
    </div>
  </div>
  )
}

export default AdminMovies