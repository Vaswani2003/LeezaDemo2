import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; 

export default function Signup() {
    return (
        <div className="Signup-container">
            <h1>Sign Up</h1>
            <form className="Signup-form">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Sign Up</button>
            </form>
            <div className="Login-link">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
}
