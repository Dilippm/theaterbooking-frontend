import axios from 'axios';
const VITE_API_MOVIE_URL = import.meta.env.VITE_API_OWNER_URL;
const VITE_API_BOOKING_URL = import.meta.env.VITE_API_BOOKING_URL;
const VITE_API_RESERVATION_URL = import.meta.env.VITE_API_RESERVATION_URL;

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


  export const bookSeat = async(credentials,clientSecret) =>{
  
    const data ={
      "theater":credentials.theater,
  "selectedSeats":credentials.selectedSeats,
  "time":credentials.time,
  "date":credentials.date,
  "user":credentials.user,
  "price":credentials.price,
  "paymentId":clientSecret,
  "movie":credentials.movie
    }
   
    try {
      const response = await axios.post(
        `${VITE_API_RESERVATION_URL}/add_booking`,
        data,
        // {
        //   headers: {
        //     'Authorization': `Bearer ${token}`, // Include the authorization header
        //   },
        // }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding seats:', error);
      throw error;
    }
  }

  export const getBookingDetails = async(id) =>{
    try {
      const response = await axios.get(
        `${VITE_API_RESERVATION_URL}/user_bookings/${id}`
       
        // {
        //   headers: {
        //     'Authorization': `Bearer ${token}`, // Include the authorization header
        //   },
        // }
      );
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error getting booking details:', error);
      throw error;
    }
  }