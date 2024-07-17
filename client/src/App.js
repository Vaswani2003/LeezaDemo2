import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/Homepage';
import Login from './pages/login';
import Assessment from './pages/assesment';
import Signup from './pages/signup';


function App() {
  return (
    <BrowserRouter>
      <div className="App">

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
  <h1 style={{ margin: '0', color: '#333' }}>Leeza</h1>
  <nav>
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex' }}>
      <li style={{ marginRight: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
      </li>
      <li style={{ marginRight: '20px' }}>
        <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Login</Link>
      </li>
      <li style={{ marginRight: '20px' }}>
        <Link to="/assessment" style={{ textDecoration: 'none', color: '#333' }}>Assessment</Link>
      </li>
      <li>
        <Link to="/signup" style={{ textDecoration: 'none', color: '#333' }}>Sign Up</Link>
      </li>
    </ul>
  </nav>
</header>

        {/* Main Content */}
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{ background: '#f0f0f0', padding: '10px 0', marginTop: '20px', textAlign: 'center' }}>
          <p>&copy; 2024 Leeza's Demo 2. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
