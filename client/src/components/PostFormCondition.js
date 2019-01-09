import React, { Component } from 'react'
import { FormGroup, FormControl, HelpBlock, Col, Row } from 'react-bootstrap'
import './PostForm.css'

export default class PostFormCondition extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={3} md={3}>
            <label>
              Condition: <span className="req">*</span>
            </label>
          </Col>
          <Col xs={8} sm={6} md={6}>
            <FormGroup
              controlId="formItemCondition"
              validationState={this.props.valid}
            >
              <FormControl
                name="itemCondition"
                type="text"
                value={this.props.value}
                onChange={this.props.handleChange}
                placeholder="Enter Condition"
              />
              <FormControl.Feedback />
              <HelpBlock>{this.props.errorMsg}</HelpBlock>
            </FormGroup>
            <Col md={3} />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
