import React, { Component } from 'react'
import { Tab, Tabs, Grid, Well, PageHeader } from 'react-bootstrap'
import AdminItems from '../components/AdminItems'

class AdminDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      approval_status: [],
      post_id: [],
      category: [],
      name: [],
      email: [],
      created_at: [],
    }
  }

  getAllItemsDetails() {
    fetch('/api/items')
      .then(data => data.json())
      .then(result => {
        if (result !== undefined) {
          result.forEach(results => {
            this.setState({
              approval_status: [
                ...this.state.approval_status,
                results.approval_status,
              ],
              post_id: [...this.state.post_id, results.post_id],
              category: [...this.state.category, results.category],
              name: [...this.state.name, results.name],
              email: [...this.state.email, results.email],
              created_at: [...this.state.created_at, results.created_at],
            })
          })
        }
      })
  }

  componentWillMount() {
    this.getAllItemsDetails()
  }

  setApprovedStatus(post_id) {
    fetch('/api/updateStatus/' + post_id, {
      method: 'PUT',
    }).catch(error => console.log('error'))

    window.location.reload()
  }

  render() {
    return (
      <Grid>
        <PageHeader>Admin Dashboard</PageHeader>

        <Well>
          <Tabs id="admin-tabs">
            <Tab eventKey={1} title="Items">
              <br />
              <AdminItems
                status="pending"
                approval_status={this.state.approval_status}
                post_id={this.state.post_id}
                category={this.state.category}
                name={this.state.name}
                email={this.state.email}
                created_at={this.state.created_at}
                setApprovedStatus={this.setApprovedStatus}
              />

              <AdminItems
                status="active"
                approval_status={this.state.approval_status}
                post_id={this.state.post_id}
                category={this.state.category}
                name={this.state.name}
                email={this.state.email}
                created_at={this.state.created_at}
              />
            </Tab>
          </Tabs>
        </Well>
      </Grid>
    )
  }
}

export default AdminDashboard
