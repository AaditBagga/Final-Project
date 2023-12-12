import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={homePageStyle}>
      <h1>Welcome to My Budget App!</h1>
      <p>Manage your personal finances with ease.</p>
      <div style={buttonContainerStyle}>
        <Link to="/signup" style={linkButtonStyle}>Sign Up</Link>
        <Link to="/login" style={linkButtonStyle}>Login</Link>
      </div>
    </div>
  );
}

// Styles
const homePageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
};

const buttonContainerStyle = {
  marginTop: '20px',
};

const linkButtonStyle = {
  display: 'inline-block',
  margin: '0 10px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
};

export default HomePage;
