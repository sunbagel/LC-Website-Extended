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
    if(auth?.username){
      navigate(from, { replace: true });
    }
  }, [auth, from, navigate])


  useEffect(()=>{
    setErrMsg('');
  }, [user,pwd])


  const onSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log('submitted');

    
    // console.log(username.value);
    // console.log(password.value);

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());
    const { username, password } = formDataObj;
    const userCredentials = {
      username, password
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
        id, username
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

      setAuth({})
    })

  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4">
          <div className="text-gray-700 font-bold text-xl mb-4 mt-2">Log In:</div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="username" 
              name="username"
              type="text" 
              placeholder="Username"
              autoComplete="username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="bg-white shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              name="password"
              type="password" 
              placeholder="Password"
              autoComplete="password"  
            />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>

          
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage
