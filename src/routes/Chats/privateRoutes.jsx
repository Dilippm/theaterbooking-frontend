import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../../components/headers/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Chat } from '../../pages';




const ChatPrivateRoutes = () => (
    <>
        <Header />
        <Sidebar />
        <div style={{ marginLeft: '226px', marginTop: '55px', paddingLeft: '16px',paddingTop:'16px',paddingRight:'5px' }}> {/* Adjust margin-left to account for sidebar width */}
            <Routes>
              
                <Route path="userchat" element={<Chat/>}/>
               
             
                {/* Add other public routes here if needed */}
            </Routes>
        </div>
    </>
);

export default ChatPrivateRoutes;