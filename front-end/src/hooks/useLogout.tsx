import useAuth from "./useAuth";
import axios from '../lib/axios.ts';


const useLogout = () =>{
    const { setAuth } = useAuth();
    const logout = () =>{


        axios.post('/auth/users/logout', {}, {
            withCredentials: true
        })
        .then(() => {
            setAuth(''); 
        })
        .catch(err => console.log('Logout request failed,', err))
    }

    return logout;
}

export default useLogout;

