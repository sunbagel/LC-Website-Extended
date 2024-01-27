import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {

    const {
            loginWithRedirect, 
            logout, 
            isAuthenticated
        } = useAuth0();


  return (
    isAuthenticated ? (
      <button onClick={() => logout()}>Log Out</button>
    ) : (
      <button onClick={() => loginWithRedirect()}>Log In</button>
    )
      
    
  )
}

export default LoginButton
