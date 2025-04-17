import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    id: 'bypass-user',
    email: 'bypass@example.com',
    name: 'Bypass User',
    role: 'admin',
  });
  const [loading, setLoading] = useState(false);

  // Login function (bypassed)
  async function login(email, password) {
    const mockUser = {
      id: 'bypass-user',
      email: email || 'bypass@example.com',
      name: 'Bypass User',
      role: 'admin',
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return mockUser;
  }

  // Signup function (bypassed)
  async function signup(name, email, password) {
    const mockUser = {
      id: 'bypass-user',
      email: email || 'bypass@example.com',
      name: name || 'Bypass User',
      role: 'faculty',
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    return mockUser;
  }

  // Logout function (bypassed)
  function logout() {
    setCurrentUser({
      id: 'bypass-user',
      email: 'bypass@example.com',
      name: 'Bypass User',
      role: 'admin',
    });
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}