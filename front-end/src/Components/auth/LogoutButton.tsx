
const LogoutButton = () => {

    const onClick = () =>{

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
            // console.log(data);
            
        })
        .catch(err => console.log('Logout request failed,', err))


    }



  return (
    <button onClick={onClick}>Log Out</button>
  )
}

export default LogoutButton
