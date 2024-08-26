import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {Frontpage} from '../../../pages/index'; // Adjust import paths as needed


const UserAuthRoutes = () => (
    <Routes>
        <Route path="login" element={<Frontpage />} />
        <Route path="signup" element={<Frontpage />} />
       
    </Routes>
);

export default UserAuthRoutes;