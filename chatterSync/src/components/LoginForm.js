import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import UserService from '../UserServices.js';

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState('');
    const [cookies, setCookie] = useCookies(['username']);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await UserService.login(formData);
            setMessage(response.data.message);
            if (response.data.success) {
                setCookie('username', formData.username, { path: '/' });
                onLogin(formData.username);
                navigate('/chat');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
            {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}
                <h2>Login</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div className="footer">
                    <p>Don't have an account? <a href="/register">Sign Up Here</a></p>
                </div>
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
                <p>Welcome back to the chat! Please enter your details to continue.</p>
            </form>
        </div>
    );
};

export default LoginForm;
