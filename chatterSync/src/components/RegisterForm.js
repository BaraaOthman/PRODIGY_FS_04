import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import UserService from '../UserServices';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cookies, setCookie] = useCookies(['username']);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const formData = {
            username,
            email,
            password,
        };

        try {
            console.log(`frontend 1`)

            console.log(`frontend 2 ${username} `)
            
            const response = await UserService.register(formData);

            console.log(`front end 3`)

            setMessage(response.data.message);

            if (response.data.success) {
                // Redirect to login page
                navigate('/login');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="register-form-container">
            <form onSubmit={handleSubmit} className="register-form">
            {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}
                <h2>Register</h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="footer">
                    <p>Already have an account? <a href="/login">Log in Here</a></p>
                </div>
                <button type="submit" className="register-button">Register</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default RegisterForm;
