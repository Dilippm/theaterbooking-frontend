import axios from 'axios';
const VITE_API_MOVIE_URL = import.meta.env.VITE_API_MOVIE_URL;

export const getMovies = async (token) => {
   
    try {
      const response = await axios.get(
        `${VITE_API_MOVIE_URL}/get_movies`,
       
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the authorization header
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };
  
  export const addMovie = async(credentials,token) =>{
   
    try {
        const response = await axios.post(
          `${VITE_API_MOVIE_URL}/add_movie`,
          credentials,
          {
            headers: {
              'Authorization': `Bearer ${token}`, // Include the authorization header
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
  }
  export const getMovieById = async(id,token) =>{
    try {
      const response = await axios.get(
        `${VITE_API_MOVIE_URL}/get_movie_details/${id}`,
       
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the authorization header
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  export const updateMovie = async(credentials,token,id) =>{
    console.log("data:",credentials)
    try {
        const response = await axios.put(
          `${VITE_API_MOVIE_URL}/update_movie/${id}`,
          credentials,
          {
            headers: {
              'Authorization': `Bearer ${token}`, // Include the authorization header
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
  }

  export const getLatestMovies = async () => {
   
    try {
      const response = await axios.get(
        `${VITE_API_MOVIE_URL}/get_latest_movies`
      
      );

      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };
  export const deleteMovieById = async(id,token) =>{
    try {
      const response = await axios.delete(
        `${VITE_API_MOVIE_URL}/delete_movie/${id}`,
       
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the authorization header
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error delete movie:', error);
      throw error;
    }
  }