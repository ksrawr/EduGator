import React, { Component } from 'react'
import { FormGroup, FormControl, HelpBlock, Col, Row } from 'react-bootstrap'
import './PostForm.css'

export default class PostFormName extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={3} md={3}>
            <label>
              Item Name:
              <span className="req">*</span>
            </label>
          </Col>
          <Col xs={8} sm={6} md={6}>
            <FormGroup
              controlId="formItemName"
              validationState={this.props.valid}
            >
              <FormControl
                name="itemName"
                type="text"
                value={this.props.value}
                onChange={this.props.handleChange}
                placeholder="Enter Item Name"
              />
              <FormControl.Feedback />
              <HelpBlock>{this.props.errorMsg}</HelpBlock>
            </FormGroup>
          </Col>
          <Col sm={3} md={3} />
        </Row>
      </React.Fragment>
    )
  }
}
