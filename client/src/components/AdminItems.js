import React, { Component, Fragment } from 'react'
import { Table, Panel, Button, ButtonToolbar } from 'react-bootstrap'

class AdminItems extends Component {
  render() {
    return (
      <div>
        <Panel bsStyle="primary" id="collapsible panel" defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h2">
              Currently {this.props.status} items
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Take Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.post_id.map((post, index) => {
                    return (
                      <tr key={index}>
                        {this.props.approval_status[index] ===
                          this.props.status && (
                          <Fragment>
                            <td>{this.props.post_id[index]}</td>
                            <td>{this.props.category[index]}</td>
                            <td>{this.props.name[index]}</td>
                            <td>{this.props.email[index]}</td>
                            <td>{this.props.approval_status[index]}</td>
                            <td>{this.props.created_at[index]}</td>

                            {this.props.approval_status[index] ===
                              'pending' && (
                              <td>
                                <ButtonToolbar>
                                  <Button
                                    bsSize="small"
                                    bsStyle="success"
                                    onClick={() => {
                                      this.props.setApprovedStatus(
                                        this.props.post_id[index]
                                      )
                                    }}
                                  >
                                    Approve
                                  </Button>
                                </ButtonToolbar>
                              </td>
                            )}

                            {this.props.approval_status[index] === 'active' && (
                              <td>none necessary</td>
                            )}
                          </Fragment>
                        )}
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

export default AdminItems
