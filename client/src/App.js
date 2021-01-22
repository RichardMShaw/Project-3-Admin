import UserLogin from './pages/UserLogin'
import AddFood from './pages/AddFood'
import Orders from './pages/Orders'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {JSON.parse(localStorage.getItem('token')) !== null ? (
            JSON.parse(localStorage.getItem('token')).data.isLoggedIn ? (
              <Orders />
            ) : (
              <Redirect to="/login" />
            )
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/food">
          {JSON.parse(localStorage.getItem('token')) !== null ? (
            JSON.parse(localStorage.getItem('token')).data.isLoggedIn ? (
              <AddFood />
            ) : (
              <Redirect to="/login" />
            )
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
