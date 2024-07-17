import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; 

export default function Signup() {
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
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                console.log('Signup successful');
               
            } else {
                console.error('Signup failed');
                
            }
        } catch (error) {
            console.error('Error during signup:', error);
           
        }
    };

    return (
        <div className="Signup-container">
            <h1>Sign Up</h1>
            <form className="Signup-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <button type="submit">Sign Up</button>
            </form>
            <div className="Login-link">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
}
