import axios from 'axios'
import { useState } from 'react'
import { Button, Card, CardContent, TextField } from '@material-ui/core'

const UserLogin = () => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  const handleInputChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
  }

  const handleLogin = () => {
    axios
      .post('/api/users/login', loginForm)
      .then((token) => {
        localStorage.setItem('token', JSON.stringify(token))
        window.location.replace('/')
      })
      .catch((err) => console.error(err))
  }

  return (
    <form>
      <Card>
        <CardContent>
          <TextField
            label="Username"
            name="username"
            value={loginForm.username}
            onChange={(event) => handleInputChange(event)}
          />
          <TextField
            label="Password"
            name="password"
            value={loginForm.password}
            onChange={(event) => handleInputChange(event)}
          />
        </CardContent>
        <Button onClick={() => handleLogin()}>Login</Button>
      </Card>
    </form>
  )
}

export default UserLogin
