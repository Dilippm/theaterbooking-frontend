// src/components/Header.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Profile from '../profile/Profile';
import { useSelector } from 'react-redux';
const Header = () => {
    const balance = "$1,234.56";
const isLoggedIn = useSelector((state) => state.user?.isLoggedIn)
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#004d40',boxShadow: '0 4px 8px rgba(0, 0.6, 0, 0.8)', }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Left side: App Name */}
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    App Name
                </Typography>
                   
                {/* Right side: Wallet Balance */}
                <Box sx={{ width:'500px',display: 'flex', alignItems: 'center' , justifyContent:'space-around'}}>
                {isLoggedIn ? <Profile /> : null}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit">
                        <AccountBalanceWalletIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ marginLeft: 1 }}>
                        {balance}
                    </Typography>
                </Box>
                
                    
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
