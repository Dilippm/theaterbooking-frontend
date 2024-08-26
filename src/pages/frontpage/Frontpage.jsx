import React from 'react';
import { useLocation } from 'react-router-dom';
import './Frontpage.css'; // Make sure you create this CSS file
import { Login,Register } from "../index";
const Frontpage = () => {
    const location = useLocation();
  return (
    <div className="container">
      <div className="left">
      {location.pathname === "/user/signup" ? <Register /> : <Login />}
      </div>
      <div className="right">Right Side</div>
    </div>
  );
}

export default Frontpage;
