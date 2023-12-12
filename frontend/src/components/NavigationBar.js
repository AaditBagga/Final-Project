import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav style={navStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/login" style={linkStyle}>Login</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/signup" style={linkStyle}>Sign Up</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/budget" style={linkStyle}>Budget Configuration</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/expense" style={linkStyle}>Expense Entry</Link>
        </li>
      </ul>
    </nav>
  );
}

const navStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '10px'
};

const navListStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
};

const navItemStyle = {
  marginRight: '20px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
};

export default NavigationBar;
