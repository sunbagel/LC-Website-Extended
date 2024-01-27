import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/login"/>;
  }

  // const isAdmin = user['http://your_namespace/roles'].includes('admin');
  console.log(user['http://lc-ind.us.auth0.com/roles']);

  return <Outlet/>

  
};

export default RequireAuth;
