import axios from "axios";
const ANALYTICS_URL = import.meta.env.VITE_API_ANALYTICS_URL;


export const getUserBookingAnalytics = async(token,id) =>{
    try {
      const response = await axios.get(
        `${ANALYTICS_URL}/get_user_booking_data/${id}`,
       
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the authorization header
          },
        }
      );
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error getting booking details:', error);
      throw error;
    }
  }

  export const getAdminBookingAnalytics = async(token) =>{
    try {
      const response = await axios.get(
        `${ANALYTICS_URL}/get_admin_booking_data`,
       
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the authorization header
          },
        }
      );
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error getting booking details:', error);
      throw error;
    }
  }


  export const getOwnerBookingAnalytics = async(token,id) =>{
    try {
      const response = await axios.get(
        `${ANALYTICS_URL}/get_owner_booking_data/${id}`,
       
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the authorization header
          },
        }
      );
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error getting booking details:', error);
      throw error;
    }
  }
