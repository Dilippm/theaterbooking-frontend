import axios from 'axios';
const VITE_API_REPORT_URL = import.meta.env.VITE_API_REPORT_URL;

export const getOwnerReport = async (id,token) => {
   
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_REPORT_URL}/get_owner_report/${id}`,
       
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the authorization header
          },
        }
      );


      return response.data.theaterReports;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };
  
  export const getAdminReport = async (token) => {
   
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_REPORT_URL}/get_admin_report`,
       
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the authorization header
          },
        }
      );

console.log(response.data);

      return response.data.ownerReport;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };
  