import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters long');
      return;
    }
    
    setError('');
    onLogin(username.trim());
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to Task Manager</h2>
        <p>Enter your username to get started</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              autoFocus
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-btn">
            Start Managing Tasks
          </button>
        </form>
        
        <div className="login-info">
          <p>✨ Features included:</p>
          <ul>
            <li>Add, edit, and delete tasks</li>
            <li>Set priority levels</li>
            <li>Filter and search tasks</li>
            <li>Dark mode support</li>
            <li>Data persistence</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;