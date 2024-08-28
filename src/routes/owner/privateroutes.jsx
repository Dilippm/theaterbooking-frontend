
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Theater } from '../../pages/index'; // Adjust import paths as needed
import Header from '../../components/headers/Header';
import Sidebar from '../../components/sidebar/Sidebar';

const OwnerPrivateRoutes = () => (
    <>
        <Header />
        <Sidebar />
        <div style={{ marginLeft: '226px', marginTop: '55px', paddingLeft: '16px',paddingTop:'16px',paddingRight:'5px' }}> {/* Adjust margin-left to account for sidebar width */}
            <Routes>
                <Route path="theater" element={<Theater />} />
                {/* Add other public routes here if needed */}
            </Routes>
        </div>
    </>
);

export default OwnerPrivateRoutes;