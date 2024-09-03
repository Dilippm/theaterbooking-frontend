import axios from 'axios';
const VITE_API_MOVIE_URL = import.meta.env.VITE_API_OWNER_URL;
const VITE_API_BOOKING_URL = import.meta.env.VITE_API_BOOKING_URL;

export const getTheatersByQuery = async (name = '', place = '', id, token) => {
    try {
        console.log("name:",name)
        // Encode query parameters
        const encodedName = encodeURIComponent(name);
        const encodedPlace = encodeURIComponent(place);
    console.log(encodedName)
        const response = await axios.get(
          `${VITE_API_MOVIE_URL}/get_theater?name=${encodedName}&place=${encodedPlace}&id=${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`, // Include the authorization header
            },
          }
        );
    
        return response.data;
      } catch (error) {
        console.error('Error fetching theaters:', error);
        throw error;
      }
  };

  export const bookTicket = async(credentails,token)=>{
   
    try {
      const response = await axios.post(
        `${VITE_API_BOOKING_URL}/add_reservation`,
        credentails,
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

  export const getBookedSeats = async(time,date,token) =>{
    try {
      const response = await axios.get(
        `${VITE_API_BOOKING_URL}/get_reservation/${time}/${date}`,
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