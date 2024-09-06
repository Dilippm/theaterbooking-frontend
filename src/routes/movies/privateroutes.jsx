import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminMovies,MovieDetails,UserMovies } from '../../pages/index'; // Adjust import paths as needed
import Header from '../../components/headers/Header';
import Sidebar from '../../components/sidebar/Sidebar';


const MoviePrivateRoutes = () => (
    <>
        <Header />
        <Sidebar />
        <div style={{ marginLeft: '226px', marginTop: '55px', paddingLeft: '16px',paddingTop:'16px',paddingRight:'5px' }}> {/* Adjust margin-left to account for sidebar width */}
            <Routes>
                <Route path="admin" element={<AdminMovies />} />
                <Route path="moviedetails/:id" element={<MovieDetails/>}/>
                <Route path="user" element={<UserMovies/>}/>
                {/* Add other public routes here if needed */}
            </Routes>
        </div>
    </>
);

export default MoviePrivateRoutes;