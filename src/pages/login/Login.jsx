import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../api/AuthApi';
import { setUser, setToken,setIsLoggedIn } from '../../redux/userSlice.jsx';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const result = await login({ email, password });
            // Handle successful login
            console.log('Login successful:', result);
            dispatch(setUser(result.user));
            dispatch(setToken(result.token));
            dispatch(setIsLoggedIn(true)); // Set login status to true
            navigate('/'); // Redirect to home page
        } catch (error) {
            // Handle login failure
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials');
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="container">
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
                {error && <p className="error">{error}</p>}
                <div className="formGroup">
                    <p>Don't have an account? <Link to="/user/signup" className="link">Sign up</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
