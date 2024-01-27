import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet/>

  
};

export default RequireAuth;
