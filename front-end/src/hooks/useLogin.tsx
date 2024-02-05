
import axios from "@/lib/axios"
import useAuth from "./useAuth";
import useCSRF from "./useCSRF";

const useLogin = () =>{
    const { csrfToken } = useAuth();
    
    const login = async (username : string, password : string) =>{
        
        const userCredentials = {
          username, password
        }
        const options = {
          withCredentials: true // sends cookies for auth
        }

        
        axios.defaults.headers.common['X-CSRF-TOKEN']= csrfToken;
        console.log(axios.defaults.headers.common);
        const res = await axios.post('/auth/users/login', userCredentials, options);

        return res.data;
        
    
    }

    return login;
}


export default useLogin;
