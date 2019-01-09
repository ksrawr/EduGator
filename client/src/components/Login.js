import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './Login.css'
import { Link } from 'react-router-dom'
import { history } from '../routes/Routes'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 401) {
          return window.alert('Wrong email or password. Please try again')
        }
        window.localStorage.setItem('token', response.token)
        window.localStorage.setItem('email', response.email)
        history.push('/')
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            {this.state.error && (
              <div id="error-message"> {this.state.error} </div>
            )}
            <ControlLabel>
              <span className="required"> * </span>
              Email
            </ControlLabel>
            <FormControl
              style={this.state.error ? { border: '1px red solid' } : {}}
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>
              <span className="required"> * </span>
              Password
            </ControlLabel>
            <FormControl
              style={this.state.error ? { border: '1px red solid' } : {}}
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              required
            />
          </FormGroup>

          <Link id="forgot-password-link" to="/forgot">
            {' '}
            Forgot Password{' '}
          </Link>

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>

          <Link id="sign-up-link" to="/signup">
            {' '}
            No account yet? Register Now{' '}
          </Link>
        </form>
      </div>
    )
  }
}
