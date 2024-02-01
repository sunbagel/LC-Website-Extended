
import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  
  // isAuth context (if authenticated)
  const { auth } = useAuth();
  const location = useLocation();

  return(
    auth?.username 
      ? <Outlet/>
      : <Navigate to="/login" state={{ from: location }} replace />
  )

  
};

export default RequireAuth;
