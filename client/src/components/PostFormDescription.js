import React, { Component } from 'react'
import { FormGroup, FormControl, HelpBlock, Col, Row } from 'react-bootstrap'

export default class PostFormDescription extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={3} md={3}>
            <label>Description:</label>
          </Col>
          <Col xs={8} sm={6} md={6}>
            <FormGroup
              controlId="formItemDescription"
              validationState={this.props.valid}
            >
              <FormControl
                name="itemDescription"
                type="text"
                value={this.props.value}
                onChange={this.props.handleChange}
                placeholder="Enter Item Description..."
                componentClass="textarea"
              />
              <FormControl.Feedback />
              <HelpBlock>{this.props.errorMsg}</HelpBlock>
            </FormGroup>
          </Col>
          <Col md={3} />
        </Row>
      </React.Fragment>
    )
  }
}
