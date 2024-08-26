// src/components/Sidebar.jsx

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography, Avatar, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

import InsightsIcon from '@mui/icons-material/Insights';
import CategoryIcon from '@mui/icons-material/Category';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setIsLoggedIn } from '../../redux/userSlice'; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import Profile from "../profile/Profile";

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const name = useSelector((state) => state.user?.user?.username);
    const userimage = useSelector((state) => state.user?.user?.userimage);
    const user = {
        name: name,
        profileImage: '/path-to-your-profile-image.jpg' // Replace with actual profile image path
    };

    const handleLogout = () => {
        navigate('/user/login');
        dispatch(clearUser());
        dispatch(setIsLoggedIn(false)); // Set login status to false
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    top: 64,
                    backgroundColor: '#2c6b49',
                    color: '#f5f5f5',
                    boxShadow: '0 4px 8px rgba(0, 0.5, 0, 0.5)',
                },
            }}
        >
            <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar alt={user.name} src={userimage} sx={{ width: 80, height: 80 }} />
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                    {name}
                </Typography>
                <Divider sx={{ my: 2 }} />
            </Box>
            <List>
                {/* <ListItem button sx={{ mb: 3, padding: 0 }}>
                    <Profile />
                </ListItem> */}
                <ListItem button sx={{ mb: 3 }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button sx={{ mb: 3 }}>
                    <ListItemIcon>
                        <InsightsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Analytics" />
                </ListItem>
                <ListItem button sx={{ mb: 3 }}>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Bookings" />
                </ListItem>
                <ListItem button sx={{ mb: 3 }}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Movies" />
                </ListItem>
                <Divider sx={{ backgroundColor: '#8d6e63' }} />
                <ListItem button sx={{ mt: 2 }} onClick={isLoggedIn ? handleLogout : handleLogout}>
                    <ListItemIcon>
                        {isLoggedIn ? <LockIcon /> : <LockOpenIcon />}
                    </ListItemIcon>
                    <ListItemText primary={isLoggedIn ? "Logout" : "Login"} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
