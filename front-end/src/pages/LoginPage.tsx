import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'



const LoginPage = () => {

  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // dynamically, where they came from
  // in this case it'd really only be app-home
  const from = location.state?.from?.pathname || '/app-home';


  const [user, setUser] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(()=>{
    console.log("Auth", auth);
  }, [auth])

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

  useEffect(()=>{
    setErrMsg('');
  }, [user,pwd])

  const handleSubmit =  async () => {
    const userCredentials = {
      username: 'alex2',
      password: 'hello'
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userCredentials),
      withCredentials: true
    }

    fetch('/api/auth/users/login', requestOptions)
    .then(res => res.json())
    .then(res => {
      const { id, username } = res;
      setAuth({
        id, username, isAuth : true
      })
      // reset fields
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    }).catch(err =>{
      if(!err?.response){
        setErrMsg('No Server Response');
      } else if(err.response?.status === 400){
        setErrMsg('Missing Username or Password');
      } else if(err.response?.status === 401){
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }

      setAuth({
        isAuth : false
      })
    })

  }


  return (
    <div>
      <h1>Please Log In:</h1>
      <button onClick={handleSubmit}>Log In</button>
    </div>
  )
}

export default LoginPage
