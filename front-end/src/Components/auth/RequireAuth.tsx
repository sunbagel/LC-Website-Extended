
import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  
  // need to get isAuthenticated context later.
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
  
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet/>

  
};

export default RequireAuth;
