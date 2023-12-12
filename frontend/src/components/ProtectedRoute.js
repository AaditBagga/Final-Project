import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Redirect to the login page if not logged in
    return <Navigate to="/login" />;
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
