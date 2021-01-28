import axios from 'axios'

import UserLogin from './pages/UserLogin'
import AddFood from './pages/AddFood'
import Orders from './pages/Orders'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'

const App = () => {
  const [appState, setAppState] = useState({
    isLoggedIn: 'wait',
  })

  const checkLoginState = () => {
    switch (appState.isLoggedIn) {
      case true:
        return true
      case false:
        return false
      default:
        return 'wait'
    }
  }

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'))
    if (
      token === null ||
      token.config === undefined ||
      token.config.data === undefined
    ) {
      setAppState({ ...appState, isLoggedIn: false })
      return
    }

    let { username, password } = JSON.parse(token.config.data)

    axios
      .post('/api/users/login', {
        username: username,
        password: password,
      })
      .then(({ data: token }) => {
        if (token.isLoggedIn === false) {
          setAppState({ ...appState, isLoggedIn: false })
        }
        setAppState({ ...appState, isLoggedIn: true })
      })
      .catch((err) => {
        console.error(err)
        setAppState({ ...appState, isLoggedIn: false })
      })
  }, [])
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {checkLoginState() === 'wait' ? (
            'Loading...'
          ) : checkLoginState() === true ? (
            <Orders />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/food">
          {checkLoginState() === 'wait' ? (
            'Loading...'
          ) : checkLoginState() === true ? (
            <AddFood />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login">
          <UserLogin />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
