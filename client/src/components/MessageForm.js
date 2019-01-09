import React, { Component } from 'react'
import {
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  Row,
  Col,
} from 'react-bootstrap'
import './MessageWindow.css'

export default class MessageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sender: window.localStorage.getItem('email'),
      msgUser: '',
      validUser: null,
      errorUser: '',
      msgValue: '',
      validValue: null,
      errorMsg: '',
      fetchError: 'false',
      errorSubmission: '',
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateSubmission = () => {
    let isError = false

    if (this.state.msgUser.length <= 1) {
      isError = true
      this.setState({
        errorUser: 'Identify the name of the item you are posting',
        validUser: 'error',
      })
    } else {
      this.setState({ validUser: 'success' })
    }

    if (this.state.msgValue.length <= 1) {
      isError = true
      this.setState({
        errorMsg: 'Message cannot be blank',
        validValue: 'error',
      })
    } else {
      this.setState({ validValue: 'success' })
    }
    return isError
  }

  testMessage() {
    fetch('/api/messages')
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
        sender: this.state.sender,
        reciever: this.state.msgUser,
        message: this.state.msgValue,
      }),
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  handleSubmit = e => {
    e.preventDefault()
    const err = this.validateSubmission()
    if (!err) {
      this.sendMessage()
      this.testMessage()
      this.setState({
        msgUser: '',
        validUser: null,
        errorUser: '',
        msgValue: '',
        value: '',
        errorMsg: '',
        validValue: null,
        fetchError: 'false',
        errorSubmission: '',
      })
    }
  }

  render() {
    return (
      <div>
        <h2 id="error">{this.state.errorSubmission}</h2>
        <Row>
          <Col xs={3} sm={3} md={3} />
          <Col xs={9} sm={9} md={9}>
            <label id="label-msg">Send to:</label>
          </Col>
        </Row>
        <Row>
          <Col xs={3} sm={3} md={3} />
          <Col xs={6} sm={6} md={6}>
            <form>
              <FormGroup
                controlId="formContact"
                validationState={this.state.validUser}
              >
                <FormControl
                  name="msgUser"
                  type="text"
                  value={this.state.msgUser}
                  onChange={this.handleChange}
                  placeholder="Define a user"
                />
                <FormControl.Feedback />
                <HelpBlock>{this.state.errorUser}</HelpBlock>
              </FormGroup>
            </form>
          </Col>
          <Col sm={3} md={3} />
        </Row>
        <Row>
          <Col xs={3} sm={3} md={3} />
          <Col xs={9} sm={9} md={9}>
            <label id="label-msg">Leave a Message:</label>
          </Col>
        </Row>
        <Row>
          <Col xs={3} sm={3} md={3} />
          <Col xs={6} sm={6} md={6}>
            <form>
              <FormGroup
                controlId="formContactSeller"
                validationState={this.state.validValue}
              >
                <FormControl
                  name="msgValue"
                  type="textarea"
                  value={this.state.msgValue}
                  onChange={this.handleChange}
                  placeholder="Type a Message..."
                  componentClass="textarea"
                />
                <FormControl.Feedback />
                <HelpBlock>{this.state.errorMsg}</HelpBlock>
              </FormGroup>
            </form>
          </Col>
          <Col sm={3} md={3} />
        </Row>
        <Row>
          <Col sm={3} md={3} />
          <Col sm={6} md={6}>
            <Button
              id="create-msg-btn"
              type="submit"
              onClick={e => this.handleSubmit(e)}
            >
              Send
            </Button>
          </Col>
          <Col sm={3} md={3} />
        </Row>
      </div>
    )
  }
}
