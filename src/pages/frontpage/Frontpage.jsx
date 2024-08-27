import React, { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import './Frontpage.css'; // Make sure you create this CSS file

// Lazy load components
const Login = lazy(() => import('../login/Login')); // Adjust the import path as necessary
const Register = lazy(() => import('../register/Register')); // Adjust the import path as necessary
const TrailerPlayer = lazy(() => import('../../components/trailerPlayer/TrailerPlayer'));

const Frontpage = () => {
  const videoId = "l91Km49W9qI";
  const location = useLocation();

  return (
    <div className="container">
    <div className="left">
      <Suspense fallback={<div className="spinner"></div>}>
        {location.pathname === "/user/signup" ? <Register /> : <Login />}
      </Suspense>
    </div>
    <div className="right">
      <Suspense fallback={<div className="spinner"></div>}>
        <TrailerPlayer videoId={videoId} />
      </Suspense>
    </div>
  </div>
  );
};

export default Frontpage;
