import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Login from './components/Login';
import TaskManager from './components/TaskManager';

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user and dark mode preference
    const savedUser = localStorage.getItem('taskManagerUser');
    const savedDarkMode = localStorage.getItem('taskManagerDarkMode');
    
    if (savedUser) {
      setUser(savedUser);
    }
    
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = useCallback((username) => {
    setUser(username);
    localStorage.setItem('taskManagerUser', username);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('taskManagerUser');
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('taskManagerDarkMode', newDarkMode.toString());
  }, [darkMode]);

  if (isLoading) {
    return (
      <div className="app loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Task Manager...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="app-header">
        <h1>Task Manager</h1>
        <div className="header-controls">
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          {user && (
            <div className="user-info">
              <span>Welcome, {user}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="app-main">
        {user ? (
          <TaskManager user={user} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}

export default App;