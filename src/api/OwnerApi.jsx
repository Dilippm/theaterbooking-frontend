import axios from 'axios';
const VITE_API_OWNER_URL = import.meta.env.VITE_API_OWNER_URL;

export const gettheaters = async (id,token) => {
   
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_OWNER_URL}/get_theaters_owner/${id}`,
       
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
  

  export const addtheater = async(credentials,token) =>{
    console.log("data:",credentials)
    try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_OWNER_URL}/add_theater`,
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
  export const gettheaterById = async(id,token) =>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_OWNER_URL}/get_theater_details/${id}`,
       
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

  export const updateTheater = async(credentials,token,id) =>{
    console.log("data:",credentials)
    try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_OWNER_URL}/update_theater/${id}`,
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