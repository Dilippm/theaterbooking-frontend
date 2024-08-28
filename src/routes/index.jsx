// src/routes/index.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserAuthRoutes from './Auth/userAuth/user'; // Import your user authentication routes
import PublicRoutes from './Auth/publicroutes';
import OwnerPrivateRoutes from './owner/privateroutes';


const AppRoutes = () => (
    <Routes>
        {/* Define the main routes and render UserAuthRoutes for authentication-related routes */}
        <Route path="/user/*" element={<UserAuthRoutes />} />
      
        <Route path="/" element ={<PublicRoutes/>}/>
       <Route path="/owner/*" element ={<OwnerPrivateRoutes/>}/>
    </Routes>
);

export default AppRoutes;
