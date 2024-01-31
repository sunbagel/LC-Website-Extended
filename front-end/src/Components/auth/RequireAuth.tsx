
import { useState, useContext } from 'react';
import AuthContext from '@/context/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  
  // isAuth context (if authenticated)
  const { isAuth } = useContext(AuthContext);
  
  const location = useLocation();

  if (!isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet/>

  
};

export default RequireAuth;
