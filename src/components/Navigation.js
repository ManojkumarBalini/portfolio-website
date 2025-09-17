import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import ThemeToggle from './Portfolio/ThemeToggle';

export default function Navigation() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Link to="/" style={{ 
        textDecoration: 'none', 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        color: isDark ? 'white' : '#213547'
      }}>
        My Portfolio
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ThemeToggle />
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}