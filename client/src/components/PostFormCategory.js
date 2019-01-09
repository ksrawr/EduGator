import React, { Component } from 'react'
import { FormGroup, FormControl, HelpBlock, Col, Row } from 'react-bootstrap'
import './PostForm.css'

export default class PostFormCategory extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm={3} md={3}>
            <label>
              Category: <span className="req">*</span>
            </label>
          </Col>
          <Col xs={8} sm={6} md={6}>
            <FormGroup
              controlId="formItemCategory"
              validationState={this.props.valid}
            >
              <FormControl
                componentClass="select"
                onChange={this.props.handleChange}
              >
                <option value="">Select a Category</option>
                {this.props.categories.map((category, index) => {
                  return (
                    <option value={category.name} key={index}>
                      {' '}
                      {category.name}
                    </option>
                  )
                })}
              </FormControl>
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
