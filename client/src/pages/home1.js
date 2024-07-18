import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Home1 = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/assessment');
  };

  const handleLoginSignupClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-page">
      <header>
        <button className="login-signup-button" onClick={handleLoginSignupClick}>
          Login/Signup
        </button>
      </header>
      <main>
        <h1>Welcome to the Assessment Portal</h1>
        <button className="cta-button" onClick={handleCTAClick}>
          Take Assessment
        </button>
      </main>
    </div>
  );
};

export default Home1;
