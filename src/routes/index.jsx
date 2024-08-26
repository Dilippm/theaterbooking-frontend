// src/routes/index.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserAuthRoutes from './Auth/userAuth/user'; // Import your user authentication routes
import PublicRoutes from './Auth/publicroutes';


const AppRoutes = () => (
    <Routes>
        {/* Define the main routes and render UserAuthRoutes for authentication-related routes */}
        <Route path="/user/*" element={<UserAuthRoutes />} />
      
        <Route path="/" element ={<PublicRoutes/>}/>
       
    </Routes>
);

export default AppRoutes;
