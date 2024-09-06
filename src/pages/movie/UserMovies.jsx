import React, { useEffect, useState } from 'react';
import { getMovies } from '../../api/movieApi'; 
import { useSelector } from 'react-redux';
import './UserMovies.css'; // Import the CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const UserMovies = () => {
  const token = useSelector((state) => state.user?.token);
  const [movies, setMovies] = useState([]); 
  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies(token); 
        setMovies(response);
        console.log(response); // Log the response to verify
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, [token]);
 // Function to handle the "Book Now" button click
 const handleBookNow = (movieId) => {
    navigate(`/movies/moviedetails/${movieId}`); // Navigate to the movie details page
  };

  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <div key={movie.ID} className="movie-card">
          <img src={movie.Image} alt={movie.MovieName} className="movie-image" />
          <div className="movie-details">
            <h2 className="movie-title">{movie.MovieName}</h2>
            <p className="movie-description">{movie.Description}</p>
            <p className="movie-genre">Genre: {movie.Genre}</p>
            <p className="movie-language">Language: {movie.Language}</p>
            <p className="movie-release-date">Release Date: {new Date(movie.ReleaseDate).toLocaleDateString()}</p>
            <button 
              className="book-now-button" 
              onClick={() => handleBookNow(movie.ID)} // Pass the movie ID to the handler
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserMovies;
