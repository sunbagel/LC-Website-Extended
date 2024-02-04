
import axios from '@/lib/axios';
import { useCallback } from 'react';


const useCSRF = () =>{

    const getCSRFToken = useCallback(async () => {

        try{
            const res = await axios.get('/auth/csrf-token', {
                withCredentials : true
            })
            return res.data;
        } catch (err) {
            console.log("Error with CSRF Token Request: ", err);
        }
        
        
    }, []);

    return getCSRFToken;


}



export default useCSRF;


