import React, { Component } from 'react'
import { FormGroup, FormControl, HelpBlock, Col, Row } from 'react-bootstrap'

export default class PostFormPrice extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={3} md={3}>
            <label>
              Price $: <span className="req">*</span>
            </label>
          </Col>
          <Col xs={8} sm={6} md={6}>
            <FormGroup
              controlId="formItemName"
              validationState={this.props.valid}
            >
              <FormControl
                name="itemPrice"
                type="number"
                value={this.props.value}
                onChange={this.props.handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
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
