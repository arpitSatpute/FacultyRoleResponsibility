import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Faculty Management Portal</Link>
      </div>

      {currentUser && (
        <nav className="nav-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/faculty">Faculty</Link>
          <Link to="/roles">Roles</Link>
          <Link to="/responsibilities">Responsibilities</Link>
        </nav>
      )}

      <div className="user-actions">
        {currentUser ? (
          <>
            <span className="user-name">Welcome, {currentUser.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

