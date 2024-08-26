import axios from 'axios';

const SPRINT_API_URL = import.meta.env.VITE_API_SPRINT_URL;

export const getAllUserSprints = async (id,token) => {
  
  try {
   

    const response = await axios.get(`${SPRINT_API_URL}/get_all_sprints/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching sprints:', error);
    throw error;
  }
};
export const getSprintDetails = async (id,token) => {
  
    try {
     
  
      const response = await axios.get(`${SPRINT_API_URL}/get_sprint_detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching sprint details:', error);
      throw error;
    }
  };
  