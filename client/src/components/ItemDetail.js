import React, { Component } from 'react'
import { Modal, Button, Panel } from 'react-bootstrap'
import ContactForm from './ContactForm'
import './ItemDetail.css'

export default class ItemDetail extends Component {
  render() {
    return (
      <div id="window">
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="img-container">
              <img
                width="100%"
                height="100%"
                src={this.props.image}
                alt="Thumbnail"
              />
            </div>
          </Modal.Body>
          <Panel>
            <Panel.Body>
              <ul>
                <li>
                  <strong>Price: $</strong>
                  {this.props.price}
                </li>
                <li>
                  <strong>Created At: </strong>
                  {this.props.created_at}
                </li>
                <li>
                  <strong>Condition: </strong>
                  {this.props.condition}
                </li>
                <li>
                  <strong>Description: </strong>
                  {this.props.description}
                </li>
              </ul>
            </Panel.Body>
          </Panel>
          <ContactForm email={this.props.email} />
          <Modal.Footer>
            <Button id="full" bsStyle="warning" onClick={this.props.onHide}>
              C L O S E
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
