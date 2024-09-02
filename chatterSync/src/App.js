import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import ChatList from './components/ChatList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './styles.css';
const App = () => {
  const [username, setUsername] = useState('');
  const [currentRoom, setCurrentRoom] = useState(localStorage.getItem('room') || 'general');
  const [reloadKey, setReloadKey] = useState(0);

  const handleRoomSelect = (roomName) => {
    setCurrentRoom(roomName);
  };

  const handleLogin = (usernameInput) => {
    setUsername(usernameInput);
  };

  const handleRegister = () => {
    setReloadKey(prevKey => prevKey + 1);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/register" 
            element={<RegisterForm onRegister={handleRegister} />} 
          />
          <Route 
            path="/login" 
            element={!username ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/chat" />}
          />
          <Route 
            path="/chat" 
            element={username ? (
              <div className="chat-container" key={reloadKey}>
                <ChatList onRoomSelect={handleRoomSelect} />
                <ChatRoom room={currentRoom} />
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
