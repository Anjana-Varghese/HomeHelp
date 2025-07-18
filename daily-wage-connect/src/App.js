import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import ToolRentalPage from './components/ToolRentalPage';
import NotificationSystem from './components/NotificationSystem';
import { notifications } from './data/dummyData';

function App() {
  const [user, setUser] = useState(null);
  const [userNotifications, setUserNotifications] = useState(notifications);

  useEffect(() => {
    // Check if user is logged in (simulate with localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const addNotification = (notification) => {
    setUserNotifications(prev => [
      {
        ...notification,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false
      },
      ...prev
    ]);
  };

  const markNotificationAsRead = (id) => {
    setUserNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <NotificationSystem 
          notifications={userNotifications}
          onMarkAsRead={markNotificationAsRead}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route 
            path="/user-dashboard" 
            element={
              user && user.role === 'user' ? 
                <UserDashboard user={user} onLogout={handleLogout} addNotification={addNotification} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/worker-dashboard" 
            element={
              user && user.role === 'worker' ? 
                <WorkerDashboard user={user} onLogout={handleLogout} addNotification={addNotification} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route path="/tools" element={<ToolRentalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
