import React, { useState } from "react";
import {updateProfile} from "../../api/AuthApi";
import { handleUpload } from "../../api/CloudianryApi";
import { setUser} from '../../redux/userSlice';
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "#ffffff", // Matching the Sidebar background color
  color: "#f5f5f5", // Matching the Sidebar text color

  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(255, 255, 255, 0.6)", // Proper box-shadow syntax
  p: 4,
  borderRadius: "8px",
};

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(useSelector((state) => state.user?.user?.username)); // Replace with actual user data
  const [email, setEmail] = useState(useSelector((state) => state.user?.user?.email));
  const [profileImage, setProfileImage] = useState(useSelector((state) => state.user?.user?.userimage)); // Replace with actual profile image path
  const dispatch = useDispatch();
const id = useSelector((state) => state.user?.user?.id)
const role = useSelector((state)=> state.user?.user?.role)
console.log(id)
  const token = useSelector((state) => state.user?.token);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleUpdate = async () => {
   // Check if there's a file selected for upload
  if (profileImage.startsWith('data:')) { // Checks if the profileImage is a data URL
    try {
      const uploadResult = await handleUpload(profileImage, setProfileImage);
      if (uploadResult) {
        // Use the uploaded image URL in the request body
        const requestBody = {
          Username: name,
          Email: email,
          UserImage: uploadResult, // Uploaded image URL
        };
        
        try {
          await updateProfile(requestBody, token,id); // Call your backend API
          // Handle successful update (e.g., show a success message)
          dispatch(setUser({
            username:name,
            email,
            userimage: uploadResult,
            id:id,
            role:role
          }));
          console.log('Profile updated successfully');
        } catch (error) {
          // Handle errors (e.g., show an error message)
          console.error('Failed to update profile:', error);
        }
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  } else {
    // If there's no new image, proceed with the existing profileImage
    const requestBody = {
      Username: name,
      Email: email,
      UserImage: profileImage,
      
    };
   
    try {
      await updateProfile(requestBody, token,id); // Call your backend API
      dispatch(setUser({
        username:name,
        email,
        userimage: profileImage,
        id:id,
        role:role
      }));
      // Handle successful update (e.g., show a success message)
      console.log('Profile updated successfully');
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Failed to update profile:', error);
    }
  }
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <Typography
          variant="h6"
          sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
        >
          Profile
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <input
              type="file"
              accept="image/*"
              hidden
              id="profile-image-upload"
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-image-upload">
              <Avatar
                alt={name}
                src={profileImage}
                sx={{ width: 80, height: 80, cursor: "pointer" }}
                onClick={() =>
                  document.getElementById("profile-image-upload").click()
                }
              />
            </label>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mt: 2, bgcolor: "white", borderRadius: "4px" }}
              type="text" // This enforces email format
              required // Optionally make it a required field
            />
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mt: 2, bgcolor: "white", borderRadius: "4px" }}
              type="email" // This enforces email format
              required // Optionally make it a required field
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
           <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#007bff',
              '&:hover': {
                backgroundColor: '#0056b3',
                transform: 'scale(1.02)',
                transition: 'background-color 0.3s, transform 0.2s',
              },
              '&:active': {
                backgroundColor: '#004494',
              },
              display: 'block', // Ensure the button is centered
              mx: 'auto', // Center the button horizontally
            }}
          >
            Update
          </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
