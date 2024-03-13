import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import Messages from './components/Messaging/Messages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/messages" element={<Messages />} />

      </Routes>
    </Router>
  );
};

export default App;
