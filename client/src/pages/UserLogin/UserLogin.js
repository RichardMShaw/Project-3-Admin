import axios from 'axios'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
  },
  failedText: {
    color: 'red',
  },
  button: {
    marginTop: '0.5rem',
  },
}))

const UserLogin = () => {
  const classes = useStyles()
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  const [pageState, setPageState] = useState({
    censorPassword: true,
    loginButtonDisabled: false,
    failedLogin: false,
    failedMessage: '',
  })

  const handleInputChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
  }

  const handleSwitchChange = (event) => {
    setPageState({ ...pageState, [event.target.name]: event.target.checked })
  }

  const handleLogin = () => {
    setPageState({ ...pageState, loginButtonDisabled: true })
    axios
      .post('/api/users/login', loginForm)
      .then((token) => {
        setPageState({ ...pageState, loginButtonDisabled: false })
        if (token.data.isLoggedIn) {
          localStorage.setItem('token', JSON.stringify(token))
          window.location.replace('/')
          return
        }
        setLoginForm({
          username: '',
          password: '',
        })
        setPageState({
          ...pageState,
          failedLogin: true,
          failedMessage: token.data.message,
        })
      })
      .catch((err) => {
        setPageState({ ...pageState, loginButtonDisabled: false })
        setPageState({ ...pageState, failedLogin: true })
        console.error(err)
      })
  }

  return (
    <Grid container xs={12}>
      <Grid xs={3} item />
      <Grid xs={6} item>
        <form className={classes.root}>
          <Card>
            <CardContent>
              {pageState.failedLogin ? (
                <Typography className={classes.failedText}>
                  {pageState.failedMessage}
                </Typography>
              ) : (
                ''
              )}
              <div>
                <TextField
                  label="Username"
                  name="username"
                  value={loginForm.username}
                  onChange={(event) => handleInputChange(event)}
                />
              </div>
              <div>
                <FormGroup row>
                  <TextField
                    type={pageState.censorPassword ? 'password' : ''}
                    label="Password"
                    name="password"
                    value={loginForm.password}
                    onChange={(event) => handleInputChange(event)}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={pageState.censorPassword}
                        onChange={handleSwitchChange}
                        name="censorPassword"
                        label="Show Password"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    }
                    label="Hide Password"
                  />
                </FormGroup>
              </div>
              <div></div>
              <div>
                <Button
                  disabled={pageState.loginButtonDisabled}
                  color="primary"
                  variant="contained"
                  onClick={() => handleLogin()}
                  className={classes.button}
                >
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Grid>
      <Grid xs={3} item />
    </Grid>
  )
}

export default UserLogin
