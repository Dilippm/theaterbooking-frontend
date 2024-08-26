
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


import AppRoutes from './routes';
import './App.css';


function App() {
  return (
    <Router>
 
      <div className="app-container">
        <AppRoutes/>
      </div>
    </Router>
  );
}

export default App;
