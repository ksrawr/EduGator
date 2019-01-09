import React, { Component } from 'react'
import { Tab, Tabs, Grid, Well, PageHeader } from 'react-bootstrap'
import UserItems from '../components/UserItems'
import UserSentMessages from '../components/UserSentMessages'
import UserReceivedMessages from '../components/UserReceivedMessages'

export default class UserDashBoard extends Component {
  constructor(props) {
    super(props)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      user_name: window.localStorage.getItem('email'),
      approval_status: [],
      post_id: [],
      name: [],
      created_at: [],
      messages_received: [],
      messages_sent: [],
      show: false,
    }
  }

  handleShow() {
    this.setState({ show: true })
  }

  handleClose() {
    this.setState({
      show: false,
    })
  }

  getUserPostings() {
    fetch('/api/items/' + this.state.user_name)
      .then(data => data.json())
      .then(results => {
        if (results !== undefined) {
          console.log(results)
          results.forEach(results => {
            this.setState({
              approval_status: [
                ...this.state.approval_status,
                results.approval_status,
              ],
              post_id: [...this.state.post_id, results.post_id],
              name: [...this.state.name, results.name],
              created_at: [...this.state.created_at, results.created_at],
            })
          })
        }
      })
  }

  getUserSentMessages() {
    fetch('/api/messages/receiver', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.user_name,
      }),
    })
      .then(data => data.json())
      .then(results => {
        console.log(results)
        if (results !== undefined) {
          this.setState({
            messages_sent: results,
          })
        }
      })
  }

  getUserReceievedMessages() {
    fetch('/api/messages/sent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.user_name,
      }),
    })
      .then(data => data.json())
      .then(results => {
        console.log(results)
        if (results !== undefined) {
          this.setState({
            messages_received: results,
          })
        }
      })
  }

  componentDidMount() {
    this.getUserPostings()
    this.getUserSentMessages()
    this.getUserReceievedMessages()
  }

  render() {
    return (
      <Grid>
        <PageHeader>User Dashboard</PageHeader>

        <Well>
          <Tabs id="user-tabs">
            <Tab eventKey={1} title="Posts">
              <br />
              <UserItems
                approval_status={this.state.approval_status}
                post_id={this.state.post_id}
                name={this.state.name}
                created_at={this.state.created_at}
              />
            </Tab>
            <Tab eventKey={2} title="Messages">
              <UserReceivedMessages
                messages_sent={this.state.messages_sent}
                showModal={this.handleShow}
                onHide={this.handleClose}
                show={this.state.show}
              />
            </Tab>
            <Tab eventKey={3} title="Messages (Sent)">
              <UserSentMessages
                messages_received={this.state.messages_received}
                showModal={this.handleShow}
                onHide={this.handleClose}
                show={this.state.show}
              />
            </Tab>
          </Tabs>
        </Well>
      </Grid>
    )
  }
}
