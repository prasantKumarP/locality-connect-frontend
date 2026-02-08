import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 onClick={() => navigate('/dashboard')}>Locality Connect</h1>
        
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/my-suggestions">My Suggestions</Link>
          <Link to="/discussion">Discussion Forum</Link>
          
          <div className="user-info">
            <span>👤 {user.username}</span>
            {user.role === 'ADMIN' && (
              <span className="badge badge-new">Admin</span>
            )}
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
