


const useLogin = () =>{
    const login = async (username : string, password : string) =>{
        
        const userCredentials = {
          username, password
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userCredentials),
          withCredentials: true
        }
    
        const res = fetch('/api/auth/users/login', requestOptions)
        .then(res => res.json())
        
        return res;
    
    }

    return login;
}


export default useLogin;
