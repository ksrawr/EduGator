import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import MessageForm from './MessageForm'

export default class MessageWindow extends Component {
  render() {
    return (
      <div id="window">
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Message</Modal.Title>
          </Modal.Header>
          <MessageForm />
          <Modal.Footer>
            <Button id="full-btn" bsStyle="warning" onClick={this.props.onHide}>
              C L O S E
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
