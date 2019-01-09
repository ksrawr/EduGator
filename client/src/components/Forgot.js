import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
    }
  }

  validateForm() {
    return this.state.email.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="Submit"
          >
            Get New Password
          </Button>
        </form>
      </div>
    )
  }
}
