import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AboutData from '../data/aboutInfo.json'

class About extends Component {
  render() {
    return (
      <div>
        <ul>
          {AboutData.map((aboutUser, index) => {
            return (
              <li key={index}>
                <h4>
                  <Link
                    to={{
                      pathname: '/about/' + aboutUser.firstName,
                      state: {
                        firstName: aboutUser.firstName,
                        lastName: aboutUser.lastName,
                        bio: aboutUser.bio,
                      },
                    }}
                  >
                    {aboutUser.firstName + ' ' + aboutUser.lastName}
                  </Link>
                </h4>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default About
