import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../login/Login.css'
import {register} from "../../api/AuthApi";
const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Mock registration function, replace with actual API call
            const result = await register({ username, email, password,confirmPassword,role});
            console.log('Registration successful:', result);
            navigate('/user/login'); // Redirect to home page
        } catch (error) {
            console.error('Signup failed:', error);
            setError('Signup failed. Please check your credentials');
        } finally {
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setRole('user')
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h2 className="heading">Register</h2>
                {error && <p className="error">{error}</p>}
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
                    <label htmlFor="username" className="label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        required
                        placeholder="Enter your username"
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
                <div className="formGroup">
                    <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input"
                        required
                        placeholder="Confirm your password"
                    />
                   
                </div>
                <div className="formGroup">
                    <label className="label">Role:</label>
                    <div className="roleOptions">
                        <label>
                            <input
                                type="radio"
                                value="user"
                                checked={role === "user"}
                                onChange={(e) => setRole(e.target.value)}
                                className="radioInput"
                            />
                            User
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="owner"
                                checked={role === "owner"}
                                onChange={(e) => setRole(e.target.value)}
                                className="radioInput"
                            />
                            Owner
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="admin"
                                checked={role === "admin"}
                                onChange={(e) => setRole(e.target.value)}
                                className="radioInput"
                            />
                            Admin
                        </label>
                    </div>
                </div>
                <button type="submit" className="button">SignUp</button>
                <div className="formGroup">
                    <p>Already have an account? <Link to="/user/login" className="link">Login</Link></p>
                </div>
            </form>
        </div>
    );
};



export default Register;
