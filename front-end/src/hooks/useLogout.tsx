import useAuth from "./useAuth";
import axios from '../lib/axios.ts';


const useLogout = () =>{
    const { setAuth } = useAuth();
    const logout = () =>{

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch('/api/auth/users/logout', requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Server response error')
            }
            return response.json()
        })
        .then(() => {
            setAuth(''); 
        })
        .catch(err => console.log('Logout request failed,', err))
    }

    return logout;
}

export default useLogout;

