import React, { Component } from 'react'
import {
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  Row,
  Col,
} from 'react-bootstrap'
import './ContactForm.css'

export default class ContactForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user_name: window.localStorage.getItem('email'),
      value: '',
      validValue: null,
      errorMsg: '',
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
    this.validateCurrentState(e.target.value)
  }

  validateCurrentState(value) {
    if (value.length >= 1) {
      this.setState({ validValue: 'success' })
    } else {
      this.setState({ validValue: 'error' })
    }
  }

  testMessage() {
    fetch('/api/messages')
      .then(data => data.json())
      .then(results => {
        if (results !== undefined) {
          console.log(results)
        }
      })
    fetch('/api/messages/sender/yes')
      .then(data => data.json())
      .then(results => {
        if (results !== undefined) {
          console.log(results)
        }
      })
  }

  sendMessage() {
    fetch('/api/addMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: this.state.user_name,
        reciever: this.props.email,
        message: this.state.value,
      }),
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log('error'))
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.value <= 1) {
      console.log('error')
      this.setState({
        errorMsg: 'Message cannot be blank',
        validValue: 'error',
      })
    } else {
      this.sendMessage()
      this.testMessage()
      console.log(this.state)
      this.setState({
        value: '',
        errorMsg: '',
        validValue: null,
      })
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={2} sm={2} md={2} />
          <Col xs={10} sm={10} md={10}>
            <label id="label-msg">Leave a Message:</label>
          </Col>
        </Row>
        <Row>
          <Col xs={2} sm={2} md={2} />
          <Col xs={6} sm={6} md={6}>
            <form>
              <FormGroup
                controlId="formContactSeller"
                validationState={this.state.validValue}
              >
                <FormControl
                  name="itemSeller"
                  type="textarea"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder="Type a Message..."
                  componentClass="textarea"
                />
                <FormControl.Feedback />
                <HelpBlock>{this.state.errorMsg}</HelpBlock>
              </FormGroup>
            </form>
          </Col>
          <Col sm={4} md={4}>
            <Button
              id="create-msg-btn"
              type="submit"
              onClick={e => this.handleSubmit(e)}
            >
              Send
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}
