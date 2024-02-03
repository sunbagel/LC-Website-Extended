
import useAuth from '@/hooks/useAuth';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  
  // isAuth context (if authenticated)
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  useEffect(()=>{
    console.log("Login Render");
    
    axios.get("/auth/session-check", {
      withCredentials: true
    })
    .then(res => {
      
      const { user } = res.data;
      setAuth({ ...user });
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Fetch error:", error.message);
        
        if (error.response.status === 401) {
          // Handle unauthorized access
          setAuth({});
          // No need to return; the execution stops here within the catch block
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Fetch error: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error:", error.message);
      }
    });
  }, [setAuth])

  return(
    auth?.username
      ? <Outlet/>
      : <Navigate to="/login" state={{ from: location }} replace />
  )

  
};

export default RequireAuth;
