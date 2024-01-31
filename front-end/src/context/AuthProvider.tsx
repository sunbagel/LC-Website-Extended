import { createContext, useState } from "react";

const AuthContext = createContext({});

// can import AuthProvider as a component to wrap children
export const AuthProvider = ({children}) =>{

    // check if authenticated
    const [isAuth, setIsAuth] = useState<boolean>(false);

    // use for username, roles
    const [userInfo, setUserInfo] = useState({});

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, userInfo, setUserInfo}}>
            {children}
        </AuthContext.Provider>
    )


}

// can also import the context itself for use
export default AuthContext









