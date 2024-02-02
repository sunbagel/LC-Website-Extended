
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  
  // isAuth context (if authenticated)
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  useEffect(()=>{
    console.log("Login Render");
    
    fetch("/api/auth/session-check")
    .then(res => {
      if (res.status === 401) {
        // Handle unauthorized access
        setAuth({});
        return; // Prevent further processing
      }

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      return res.json(); // Process the response if it's OK
    })
    .then(data => {
      if (data) {
        console.log("data", data);
        const { user } = data;
        setAuth({ ...user });
      }
      
    })
    .catch(err => {
      console.log("Fetch error:", err);
    });
  }, [setAuth])

  return(
    auth?.username
      ? <Outlet/>
      : <Navigate to="/login" state={{ from: location }} replace />
  )

  
};

export default RequireAuth;
