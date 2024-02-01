


const LoginPage = () => {

  const loginReq =  () => {
    const userCredentials = {
      username: 'alex2',
      password: 'hello'
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userCredentials)
    }

    fetch('http://localhost:8080/auth/users/login', requestOptions)
    .then(response => response.json())
    .then(res => console.log(res))
  }


  return (
    <div>
      <h1>Please Log In:</h1>
      <button onClick={loginReq}>Log In</button>
    </div>
  )
}

export default LoginPage
