import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login successful');
      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setMessage('User does not exist. Please sign up.');
      } else {
        setMessage('Failed to login. Please try again.');
      }
    }
  };

  return (
    <div style={loginPageStyle}>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin} style={formStyle}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={inputStyle}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      <Link to="/signup" style={linkStyle}>Sign Up</Link>
    </div>
  );
}

// Styles
const loginPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
};

const formStyle = {
  margin: '20px 0',
};

const inputStyle = {
  margin: '10px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  width: '200px',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
};

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  marginTop: '20px',
};

export default LoginPage;
