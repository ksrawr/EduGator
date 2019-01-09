import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './Signup.css'
import './Term.js'
import { Link } from 'react-router-dom'
import { history } from '../routes/Routes'

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passworda: '',
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

    // On submit of the form, send a POST request with the data to the server.
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,

        password: this.state.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          history.push('/')
        }
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          {this.state.error && <div id="error"> {this.state.error} </div>}
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>
              <span className="required"> * </span>
              Email
            </ControlLabel>
            <FormControl
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
              style={
                this.state.password &&
                this.state.passworda &&
                this.state.password !== this.state.passworda
                  ? { border: '1px red solid' }
                  : {}
              }
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              required
            />
          </FormGroup>
          <FormGroup controlId="passworda" bsSize="large">
            <ControlLabel>
              <span className="required"> * </span>
              Retype Password
            </ControlLabel>
            <FormControl
              style={
                this.state.password &&
                this.state.passworda &&
                this.state.password !== this.state.passworda
                  ? { border: '1px red solid' }
                  : {}
              }
              value={this.state.passworda}
              onChange={this.handleChange}
              type="password"
              required
            />

            <input type="checkbox" required name="terms" />
            <Link to="/term"> I agree to Term and Conditions</Link>
          </FormGroup>

          <Button
            block
            bsSize="large"
            disabled={this.state.password !== this.state.passworda}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    )
  }
}
