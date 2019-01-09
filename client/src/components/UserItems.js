import React, { Component, Fragment } from 'react'
import { Table, Panel } from 'react-bootstrap'

export default class UserItems extends Component {
  render() {
    return (
      <div>
        <Panel bsStyle="primary" id="collapsible panel" defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h2">
              My Posts
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.post_id.map((post, index) => {
                    return (
                      <tr key={index}>
                        <Fragment>
                          <td>{this.props.post_id[index]}</td>
                          <td>{this.props.name[index]}</td>
                          <td>{this.props.created_at[index]}</td>
                          <td>{this.props.approval_status[index]}</td>
                        </Fragment>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    )
  }
}
