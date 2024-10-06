import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../api/AuthApi';
import { setUser, setToken, setIsLoggedIn } from '../../redux/userSlice.jsx';
import { useDispatch } from 'react-redux';
import {Zoom, ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr('');

        try {
            const result = await login({ email, password });
         // Show the success toast and wait for it to complete
         await new Promise((resolve) => {
            toast.success('Login Successful', {
                onClose: resolve, // Resolve the promise when the toast closes
                autoClose: 2000,   // Optional: Duration before the toast auto-closes
            });
        });

        // Now, navigate after the toast has been shown
        dispatch(setUser(result.user));
        dispatch(setToken(result.token));
        dispatch(setIsLoggedIn(true)); // Set login status to true
        navigate('/'); // Redirect to home page
        } catch (error) {
          
            setErr('Login failed. Please check your credentials');
            // Show error toast at the top center
            toast.error('Login failed. Please check your credentials ');
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="container">
          <ToastContainer
                className="custom-toast-container"
                toastClassName="custom-toast-message"
                position="top-center"
                transition={Zoom}
                autoClose={5000} // Optional: Set auto-close timing
            />
            <form onSubmit={handleSubmit} className="form">
            
                <h2 className="heading">Login</h2>
                <div className="formGroup">
                    <label htmlFor="email" className="label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="password" className="label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="button">Login</button>

            

                <div className="formGroup">
                    <p>Don't have an account? <Link to="/user/signup" className="link">Sign up</Link></p>
                </div>
                    {/* Toast Container to show toasts */}
           
            </form>
          
        </div>
    );
};

export default Login;
