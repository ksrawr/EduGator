import React, { Component, Fragment } from 'react'
import {
  Thumbnail,
  ListGroup,
  ListItem,
  ListGroupItem,
  Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class UserMessages extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="userMessages">
        <Link to="sendmessage">
          <Button type="button"> New message </Button>{' '}
        </Link>
        <ListGroup>
          {this.props.messages &&
            this.props.messages.map((message, index) => (
              <ListGroupItem key={message.id} header={'Message ' + index}>
                <div> {message.message} </div>
                <div> {message.sender} </div>
                <div> {message.created_at} </div>
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
    )
  }
}
