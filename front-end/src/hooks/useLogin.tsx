
import axios from "@/lib/axios"
import useAuth from "./useAuth";

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
    
        // error handling done outside
        const res = await axios.post('/auth/users/login', userCredentials, options)
        return res.data;

    }

    return login;
}


export default useLogin;
