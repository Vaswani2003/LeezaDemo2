import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                console.log('Login successful');
                const data = await response.json();
                const token = data.token;
                
                document.cookie = `jwt=${token}; path=/; max-age=3600; secure; samesite=strict`;
                
                navigate('/assessment');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="Login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="Login-form">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
