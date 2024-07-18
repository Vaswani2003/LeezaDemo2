import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Login from './pages/login';
import Assessment from './pages/assesment';
import Signup from './pages/signup';


function App() {
  return (
    <BrowserRouter>
      <div className="App">

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
