import useLogout from "@/hooks/useLogout";

const LogoutButton = () => {

    const logout = useLogout();



  return (
    <button className="font-raleway px-4 py-1" onClick={logout}>Log Out</button>
  )
}

export default LogoutButton
