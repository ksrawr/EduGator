import React, { Component } from 'react'
import { FormGroup, Col, Row, HelpBlock } from 'react-bootstrap'
import './PostForm.css'

export default class PostFormImage extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={3} md={3}>
            <label>
              Image: <span className="req">*</span>
            </label>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <FormGroup validationState={this.props.valid}>
              <div>
                <input type="file" onChange={this.props.handleChange} />
              </div>
              <HelpBlock>{this.props.errorMsg}</HelpBlock>
            </FormGroup>
          </Col>
          <Col md={3} />
        </Row>
      </React.Fragment>
    )
  }
}
