
import axios from "@/lib/axios"
import useAuth from "./useAuth";
import useCSRF from "./useCSRF";

const useLogin = () =>{
    const { setCsrfToken } = useAuth();
    const getCSRFToken = useCSRF();
    
    const login = async (username : string, password : string) =>{
        
        const userCredentials = {
          username, password
        }
        const options = {
          withCredentials: true // sends cookies for auth
        }

        
        const res = getCSRFToken()
        .then(
          (res) => {
            console.log(res);
            const token = res.csrfToken;
            console.log(token);
            setCsrfToken(token)
            axios.defaults.headers.common['X-CSRF-TOKEN']= token;
            console.log(axios.defaults.headers.common);
            return axios.post('/auth/users/login', userCredentials, options);
          }
        )
        .then( (res) =>{
            console.log(res.data);
            return res.data;
        })

        return res;
        
    
    }

    return login;
}


export default useLogin;
