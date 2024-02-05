import { createContext, useState } from "react";

const AuthContext = createContext({});

// can import AuthProvider as a component to wrap children
export const AuthProvider = ({children}) =>{

    // use for username, roles
    const [auth, setAuth] = useState({});
    const [csrfToken, setCsrfToken] = useState<string>('');

    return (
        <AuthContext.Provider value={{auth, setAuth, csrfToken, setCsrfToken}}>
            {children}
        </AuthContext.Provider>
    )


}

// can also import the context itself for use
export default AuthContext









