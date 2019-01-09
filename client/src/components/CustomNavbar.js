import React, { Component } from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  FormControl,
  MenuItem,
  FormGroup,
  Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CustomNavbar.css'
import { history } from '../routes/Routes'

export default class CustomNavbar extends Component {
  logout = () => {
    localStorage.setItem('token', '')
    history.push('/')
  }
  render() {
    return (
      <div>
        <h4 align="center">
          SFSU-Fulda Software Engineering Project CSC 648-848, Fall 2018. For
          Demonstration Only
        </h4>
        <h4 align="center"> Section 01 Team 03 </h4>

        <Navbar default collapseOnSelect className="main-nav">
          <Navbar.Header>
            <a href="/" class="navbar-left">
              <img src="gator.png" />
            </a>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <form>
                <FormGroup>
                  <div className="input-group-btn">
                    <Button bsSize="default" className="button-drop">
                      <Nav className="dropdown">
                        <NavDropdown
                          eventKey={1}
                          title={this.props.filter}
                          id="basic-nav-dropdown"
                          className="category-dropdown"
                        >
                          <MenuItem
                            eventKey={1.1}
                            onClick={() => {
                              this.props.changeFilter('All Categories')
                            }}
                          >
                            All Categories
                          </MenuItem>

                          {this.props.dropDownCategories.map(
                            (category, index) => {
                              const key = '1.' + (index + 2)
                              return (
                                <MenuItem
                                  key={key}
                                  eventKey={key}
                                  onClick={() => {
                                    this.props.changeFilter(`${category}`)
                                  }}
                                >
                                  {category}
                                </MenuItem>
                              )
                            }
                          )}
                        </NavDropdown>
                      </Nav>
                    </Button>
                    <FormControl
                      type="text"
                      value={this.props.value}
                      onChange={this.props.handleChange}
                      placeholder="Search EduGator"
                    />
                  </div>
                </FormGroup>
              </form>
            </Navbar.Form>

            <Nav pullRight>
              <NavItem eventKey={3} componentClass={Link} href="/" to="/post">
                Post
              </NavItem>
              <NavItem
                eventKey={4}
                componentClass={Link}
                href="/"
                to="/myaccount"
              >
                My Account
              </NavItem>
              <NavItem eventKey={5} componentClass={Link} href="/" to="/admin">
                Admin
              </NavItem>
              <NavItem eventKey={6} componentClass={Link} href="/" to="/about">
                About
              </NavItem>
              {localStorage.getItem('token') ? (
                <NavItem eventKey={7} onClick={this.logout}>
                  Logout
                </NavItem>
              ) : (
                <NavItem
                  eventKey={7}
                  componentClass={Link}
                  href="/"
                  to="/login"
                >
                  Login
                </NavItem>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
