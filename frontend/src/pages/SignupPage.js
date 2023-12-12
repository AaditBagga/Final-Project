import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Signed up successfully');
      navigate('/dashboard'); // Redirect to the dashboard after successful sign-up
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={signUpPageStyle}>
      <h1>Sign Up</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSignUp} style={formStyle}>
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
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>
      <Link to="/login" style={linkStyle}>Already have an account? Log In</Link>
    </div>
  );
}

// Styles
const signUpPageStyle = {
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
  backgroundColor: '#28a745',
  color: 'white',
  cursor: 'pointer',
};

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  marginTop: '20px',
};

export default SignUpPage;
