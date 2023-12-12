import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

function LogoutPage() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await signOut(auth);
        setMessage('Logged out successfully.');
        navigate('/'); // Redirect to homepage after logout
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div style={logoutPageStyle}>
      <p>{message}</p>
    </div>
  );
}

// Styles
const logoutPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
};

export default LogoutPage;
