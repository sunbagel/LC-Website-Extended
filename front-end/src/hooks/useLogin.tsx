
import axios from "@/lib/axios"

const useLogin = () =>{
    const login = async (username : string, password : string) =>{
        
        const userCredentials = {
          username, password
        }
        const options = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true // sends cookies for auth
        }
    

        const res = await axios.post('/auth/users/login', userCredentials, options)
        return res.data;

        
    
    }

    return login;
}


export default useLogin;
