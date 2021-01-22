import UserLogin from './pages/UserLogin'
import AddFood from './pages/AddFood'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {JSON.parse(localStorage.getItem('token')).data.isLoggedIn ? (
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
