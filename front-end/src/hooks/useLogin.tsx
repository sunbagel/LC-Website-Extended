
import axios from "@/lib/axios"

const useLogin = () =>{

    
    const login = async (username : string, password : string) =>{
        
        const userCredentials = {
          username, password
        }
        const options = {
          withCredentials: true // sends cookies for auth
        }

        
        // axios.defaults.headers.common['x-csrf-token']= csrfToken;
        console.log(axios.defaults.headers.common);
        const res = await axios.post('/auth/users/login', userCredentials, options);

        // set new token that's returned
        axios.defaults.headers.common['x-csrf-token']= res?.data?.csrfToken;

        return res.data;
        
    
    }

    return login;
}


export default useLogin;
