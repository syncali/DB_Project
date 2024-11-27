// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminLogin = async () => {
    try {
      setIsAdmin(true);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Admin login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('user');
      sessionStorage.clear();
      setIsLoggedIn(false);
      // Set user to default state instead of null
      setUser({
        firstName: '',
        avatar: 'U'
      });
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      setIsLoggedIn, 
      user, 
      setUser,
      logout,
      isAdmin,
      adminLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);