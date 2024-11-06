import axios from 'axios';

const VITE_API_CHAT_URL = import.meta.env.VITE_API_CHAT_URL;

export const getChatUsers = async (token) => {
 
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_CHAT_URL}/chat/users`,
      
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
  

export const getChatMessages = async (token,id) => {
 
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_CHAT_URL}/messages/${id}`,
    
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

export const sendChatMessage = async (token, id, message) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_CHAT_URL}/messages/send/${id}`,
      { message }, // Send the message in the request body
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the authorization header
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error sending chat message:', error); // Log the error
    throw error; // Rethrow the error for further handling
  }
};
