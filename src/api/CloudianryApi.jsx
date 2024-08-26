// cloudinaryService.js
import axios from 'axios';

export const handleUpload = async (file, setImageUrl) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default');

  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/drog3carp/image/upload', formData);
    setImageUrl(response.data.secure_url);
    return response.data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};
