import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Report } from '../../pages/index'; // Adjust import paths as needed
import Header from '../../components/headers/Header';
import Sidebar from '../../components/sidebar/Sidebar';


const ReportPrivateRoutes = () => (
    <>
        <Header />
        <Sidebar />
        <div style={{ marginLeft: '226px', marginTop: '55px', paddingLeft: '16px',paddingTop:'16px',paddingRight:'5px' }}> {/* Adjust margin-left to account for sidebar width */}
            <Routes>
                <Route path="report" element={<Report />} />
               
            </Routes>
        </div>
    </>
);

export default ReportPrivateRoutes;