import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Login from './pages/login';
import Assessment from './pages/assesment';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <header style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px'}}>
          <h1>Leeza's Demo 2</h1>
      </header>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assessment" element={<Assessment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
