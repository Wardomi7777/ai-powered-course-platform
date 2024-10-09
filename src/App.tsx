import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { UserProvider } from './contexts/UserContext';
import { LessonsProvider } from './contexts/LessonsContext';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedRole && storedApiKey) {
      setIsLoggedIn(true);
      setUserRole(storedRole as 'admin' | 'user');
      setApiKey(storedApiKey);
    }
  }, []);

  const handleLogin = (role: 'admin' | 'user', key: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setApiKey(key);
    localStorage.setItem('userRole', role);
    localStorage.setItem('apiKey', key);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setApiKey('');
    localStorage.removeItem('userRole');
    localStorage.removeItem('apiKey');
  };

  const switchRole = () => {
    const newRole = userRole === 'admin' ? 'user' : 'admin';
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  return (
    <UserProvider initialApiKey={apiKey}>
      <LessonsProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            {isLoggedIn && <Navbar userRole={userRole} onLogout={handleLogout} onSwitchRole={switchRole} />}
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route
                path="/admin/*"
                element={
                  isLoggedIn && userRole === 'admin' ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/user/*"
                element={
                  isLoggedIn && userRole === 'user' ? (
                    <UserDashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="*" element={<Navigate to={isLoggedIn ? `/${userRole}` : "/login"} replace />} />
            </Routes>
          </div>
        </Router>
      </LessonsProvider>
    </UserProvider>
  );
}

export default App;