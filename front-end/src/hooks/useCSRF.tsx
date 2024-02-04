
import axios from '@/lib/axios';


const useCSRF = () =>{

    const getToken = async () => {

        try{
            const res = await axios.get('/auth/csrf-token', {
                withCredentials : true
            })
            return res;
        } catch (err) {
            console.log("Error with CSRF Token Request: ", err);
        }
        
        
    }

    return getToken();


}



export default useCSRF;


