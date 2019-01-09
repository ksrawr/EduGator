import React, { Component } from 'react'
import { Grid, Well, Col } from 'react-bootstrap'

export default class AboutInfo extends Component {
  render() {
    return (
      <Grid>
        <Col xs={12} md={8}>
          <h2>
            {this.props.location.state.firstName +
              ' ' +
              this.props.location.state.lastName}
          </h2>
          <Well>{this.props.location.state.bio}</Well>
        </Col>
      </Grid>
    )
  }
}
