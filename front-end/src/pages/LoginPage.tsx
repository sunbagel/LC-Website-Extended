import useAuth from "@/hooks/useAuth";
import { useState } from "react";



const LoginPage = () => {

  const [user, setUser] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const { setAuth } = useAuth();

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
