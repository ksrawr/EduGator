import React, { Component } from 'react'
import { MenuItem, Nav, NavDropdown } from 'react-bootstrap'

export default class SortDropdown extends Component {
  render() {
    return (
      <div>
        <Nav pullRight={true} bsStyle="tabs">
          <NavDropdown
            pullRight={true}
            eventKey="1"
            title={this.props.dropdownMessage}
            id="price-dropdown"
          >
            <MenuItem
              eventKey="1.1"
              onClick={() => {
                this.props.sortPriceLowToHigh()
              }}
            >
              Price Low to High
            </MenuItem>
            <MenuItem
              eventKey="1.2"
              onClick={() => {
                this.props.sortPriceHighToLow()
              }}
            >
              Price High to Low
            </MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    )
  }
}
