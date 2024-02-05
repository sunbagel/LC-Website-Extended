import useAuth from "./useAuth";
import axios from '../lib/axios.ts';


const useLogout = () =>{
    const { csrfToken, setAuth } = useAuth();
    const logout = () =>{

        console.log("token from logout", csrfToken);
        axios.defaults.headers.common['X-CSRF-TOKEN']= csrfToken;
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

