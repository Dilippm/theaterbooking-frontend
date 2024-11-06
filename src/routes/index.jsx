// src/routes/index.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserAuthRoutes from './Auth/userAuth/user'; // Import your user authentication routes
import PublicRoutes from './Auth/publicroutes';
import OwnerPrivateRoutes from './owner/privateroutes';
import MoviePrivateRoutes from './movies/privateroutes';
import BookingsPrivateRoutes from './bookings/privateroutes'
import ReportPrivateRoutes from './Reports/privateroutes';
import AnalyticsPrivateRoutes from './Analytics/privateRoutes';
import ChatPrivateRoutes from './Chats/privateRoutes';
const AppRoutes = () => (
    <Routes>
        {/* Define the main routes and render UserAuthRoutes for authentication-related routes */}
        <Route path="/user/*" element={<UserAuthRoutes />} />
      
        <Route path="/" element ={<PublicRoutes/>}/>
       <Route path="/owner/*" element ={<OwnerPrivateRoutes/>}/>
       <Route path='/movies/*' element={<MoviePrivateRoutes/>}/>
       <Route path='/bookings/*' element={<BookingsPrivateRoutes/>}/>
       <Route path='/report/*' element={<ReportPrivateRoutes/>}/>
       <Route path='/analytics/*' element={<AnalyticsPrivateRoutes/>}/>
       <Route path='/chats/*' element={<ChatPrivateRoutes/>}/>
    </Routes>
);

export default AppRoutes;
