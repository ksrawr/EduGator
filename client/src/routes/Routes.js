import React, { Component } from 'react'
import { Router, Route, Redirect } from 'react-router-dom'
import './Routes.css'

import Home from '../screens/Home'
import UserDashBoard from '../screens/UserDashBoard'
import About from '../screens/About'
import AdminDashboard from '../screens/AdminDashboard'
import AboutInfo from '../components/AboutInfo'
import PostFormScreen from '../screens/PostFormScreen'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Forgot from '../components/Forgot'
import Term from '../components/Term'

// Creates history for our react router
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()

// Create private route that will redirect someone to login if not authenticated
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }}
  />
)

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" component={Home} />
          <PrivateRoute path="/myaccount" component={UserDashBoard} />
          <Route path="/about" component={About} />
          <PrivateRoute path="/admin" component={AdminDashboard} />
          <Route path="/about/:user" component={AboutInfo} />
          <PrivateRoute path="/post" component={PostFormScreen} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/term" component={Term} />
        </div>
      </Router>
    )
  }
}

export default Routes
