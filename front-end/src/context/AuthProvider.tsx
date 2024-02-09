import { ReactNode, createContext, useState } from "react";



interface User {
    id : number,
    username : string
}

interface AuthContextType {
    auth: User | undefined;
    setAuth: React.Dispatch<React.SetStateAction<User | undefined>>;
}

type AuthProviderProps =  {
    children : ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// can import AuthProvider as a component to wrap children
export const AuthProvider = ({children} : AuthProviderProps) =>{

    // use for username, roles
    const [auth, setAuth] = useState<User>();
    // const [csrfToken, setCsrfToken] = useState<string>('');

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )


}

// can also import the context itself for use
export default AuthContext









