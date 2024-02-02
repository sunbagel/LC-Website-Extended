import useLogout from "@/hooks/useLogout";

const LogoutButton = () => {

    const logout = useLogout();



  return (
    <button onClick={logout}>Log Out</button>
  )
}

export default LogoutButton
