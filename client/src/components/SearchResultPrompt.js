import React, { Component } from 'react'
import SortDropdown from './SortDropdown'

export default class SearchResultPrompt extends Component {
  render() {
    return (
      <div>
        <SortDropdown
          sortPriceLowToHigh={this.props.sortPriceLowToHigh}
          sortPriceHighToLow={this.props.sortPriceHighToLow}
          dropdownMessage={this.props.dropdownMessage}
        />

        {this.props.title.match('Search Page Home') && (
          <div>
            <h2>EduGator: Buy & Sell With Peers</h2>
            <h4>Viewing: {this.props.filter}</h4>
          </div>
        )}

        {!this.props.title.match('Search Page Home') && (
          <div>
            <h2>{this.props.title}</h2>
            <h4>filtering by: {this.props.filter}</h4>
            <p>Results returned: {this.props.resultsFound}</p>
          </div>
        )}

        {this.props.title.match('Invalid input') && (
          <div>
            <p>
              Your query is not valid input
              <br />
              Please make sure of the following and try another search query:
              <br />- Your query is less than 40 characters long
              <br />- Your query is made up of alphanumeric characters only
              (a-z,A-Z,0-9)
            </p>
          </div>
        )}

        {this.props.title.includes('No Results For') && (
          <div>
            <p>
              Sorry no results found, please try a different search query or
              category
            </p>
          </div>
        )}
      </div>
    )
  }
}
