import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #FF6B35, #e85d2f)',
      padding: '15px 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '28px' }}>🐾</span>
        <h1 style={{
          color: 'white',
          fontSize: '22px',
          fontWeight: '800',
          letterSpacing: '1px'
        }}>
          ResQAI
        </h1>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px'
        }}>
          🏠 Home
        </Link>
        <Link to="/dashboard" style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px'
        }}>
          📊 Dashboard
        </Link>
      </div>
    </nav>
  );
}