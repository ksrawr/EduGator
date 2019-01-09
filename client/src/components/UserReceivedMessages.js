import React, { Component, Fragment } from 'react'
import { Table, Panel, Button } from 'react-bootstrap'
import MessageWindow from './MessageWindow'

export default class UserSentMessages extends Component {
  render() {
    return (
      <div>
        <Panel bsStyle="primary" id="collapsible panel" defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h2">
              Messages
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sender</th>
                    <th>Message</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.messages_sent.map((item, index) => {
                    return (
                      <tr key={index}>
                        <Fragment>
                          <td>{item.message_id}</td>
                          <td>{item.sender}</td>
                          <td>{item.message}</td>
                          <td>{item.created_at}</td>
                          <td>
                            <Button
                              bsStyle="primary"
                              onClick={this.props.showModal}
                            >
                              Reply
                            </Button>
                          </td>
                        </Fragment>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <MessageWindow
          show={this.props.show}
          showModal={this.props.showModal}
          onHide={this.props.onHide}
        />
      </div>
    )
  }
}
