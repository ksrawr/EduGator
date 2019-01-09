/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  This file is responsible for rendering the Home screen, also note that the
 *  Home screen functions as the results screen.
 *
 *  The State of the Home screen is passed to the Navbar, SearchResultPrompt, and AbsoluteGrid
 *  components. 
 */

import React, { Component } from 'react'
import createAbsoluteGrid from 'react-absolute-grid'
import sort from 'fast-sort'
import Navbar from '../components/CustomNavbar'
import Card from '../components/Card'
import SearchResultPrompt from '../components/SearchResultPrompt'

// Create AbsoluteGrid from Card component
const AbsoluteGrid = createAbsoluteGrid(Card)

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      image_path: [],
      description: [],
      title: 'Search Page Home',
      names: [],
      ids: [],
      prices: [],
      created_ats: [],
      conditions: [],
      filter: 'All Categories',
      dropDownCategories: [],
      itemCategories: [],
      resultsFound: 0,
      gridItems: [],
      dropdownMessage: 'Sort By',
      emails: [],
    }
  }

  /*
   * Fetch all Items with active approval status from the database and populate the state
   * Using a callback function to ensure the state has finished updating
   * before setting up AbsoluteGrid
   */
  getAllItems() {
    fetch('/api/items')
      .then(data => data.json())
      .then(result => {
        if (result !== undefined) {
          result.forEach(results => {
            if (results.approval_status === 'active') {
              this.setState(
                {
                  image_path: [...this.state.image_path, results.image_path],
                  names: [...this.state.names, results.name],
                  ids: [...this.state.ids, results.post_id],
                  description: [...this.state.description, results.description],
                  prices: [...this.state.prices, parseFloat(results.price)],
                  itemCategories: [
                    ...this.state.itemCategories,
                    results.category,
                  ],
                  created_ats: [...this.state.created_ats, results.created_at],
                  conditions: [...this.state.conditions, results.condition],
                  emails: [...this.state.emails, results.email],
                },
                () => {
                  this.setUpGrid()
                }
              )
            }
          })
        }
      })
  }

  // Set up all the elements of the grid
  setUpGrid() {
    var tempItems = []

    this.state.ids.forEach((id, index) => {
      tempItems.push({
        key: index,
        sort: index,
        filtered: 0,
        id: this.state.ids[index],
        image_path: this.state.image_path[index],
        name: this.state.names[index],
        description: this.state.description[index],
        price: this.state.prices[index],
        itemCategory: this.state.itemCategories[index],
        condition: this.state.conditions[index],
        created_at: this.state.created_ats[index],
        email: this.state.emails[index],
      })
    })

    this.setState({ gridItems: tempItems })
  }

  // Fetch all unique categories and populate the state
  getAllDropDownCategories() {
    fetch('/api/categories')
      .then(data => data.json())
      .then(result => {
        if (result !== undefined) {
          result.forEach(results => {
            this.setState({
              dropDownCategories: [
                ...this.state.dropDownCategories,
                results.name,
              ],
            })
          })
        }
      })
  }

  /*
  ** Before the page renders for the first time make sure to 
  ** fill the dropdown button with unique categories. Also get
  ** all the items and prepare to show them on the home page.
  */
  componentDidMount() {
    this.getAllDropDownCategories()

    this.getAllItems()
  }

  //Used for handling the input on the search bar
  handleChange = e => {
    this.setState({ value: e.target.value }, () => {
      this.send()
    })
  }

  /*
  ** Change the filter and wait for the change to be complete.
  ** Once the filter has been changed call the send() function.
  ** Using a callback function once the state change is complete
  ** to ensure the page is in synch
  */
  changeFilter = newFilter => {
    this.setState({ filter: newFilter }, () => {
      this.send()
    })
  }

  /*
  ** Check if string is alphanumeric and no more than 40 characters
  ** This is done for security reasons. Here string is the value
  ** of what was in the search bar before submit was clicked
  */
  getValidationState() {
    const string = this.state.value

    if (string.match(/^[0-9a-zA-Z ]*$/) && string.length <= 40) return true
    else return false
  }

  /*
  ** This method handles most of what happens when submit is clicked in the search
  ** bar or when a different category is selected in the dropdown button.
  ** 3 Possible outcomes:
  **
  ** 1) The search query is valid so show valid results from the database.
  **    If no results let the user know
  ** 2) The search query is not valid, let the user know what to do to fix this issue
  ** 3) There is no search query, perform default home page behavior (i.e. Refresh Home)
  */
  send = () => {
    //valueDisplayedInSearchBar is used to keep the search query the user sees constant
    const valueDisplayedInSearchBar = this.state.value

    //searchString is used to make search is case-insensitive
    const searchString = valueDisplayedInSearchBar.toLowerCase()
    const searchStringIsValid = this.getValidationState()
    var resultsFound = 0

    const gridItemsCopy = this.state.gridItems.slice()

    //First if block searches based on description, category, and name
    if (!searchString.match(/^[ ]*$/) && searchStringIsValid) {
      this.setState({ resultsFound: 0 })

      this.state.gridItems.forEach((item, index) => {
        var stringToBeSearched =
          item.description.toLowerCase() +
          ' ' +
          item.itemCategory.toLowerCase() +
          ' ' +
          item.name.toLowerCase()

        if (
          stringToBeSearched.includes(searchString) &&
          (item.itemCategory === this.state.filter ||
            this.state.filter === 'All Categories')
        ) {
          gridItemsCopy[index].filtered = 0
          resultsFound++
        } else {
          gridItemsCopy[index].filtered = 1
        }
      })

      this.setState({ gridItems: gridItemsCopy })

      //if no item is set to be displayed then no results found
      if (resultsFound === 0) {
        this.setState({
          title: 'No Results For: ' + valueDisplayedInSearchBar,
          value: valueDisplayedInSearchBar,
        })
      } else {
        this.setState({
          title: 'Search Results For: ' + valueDisplayedInSearchBar,
          value: valueDisplayedInSearchBar,
          resultsFound: resultsFound,
        })
      }
    } else if (!searchString.match(/^[0-9a-zA-Z ]*$/)) {
      this.state.gridItems.forEach((item, index) => {
        gridItemsCopy[index].filtered = 1
      })

      this.setState({
        title: 'Invalid input',
        value: valueDisplayedInSearchBar,
        resultsFound: 0,
        gridItems: gridItemsCopy,
      })
    } else {
      this.state.gridItems.forEach((item, index) => {
        if (
          item.itemCategory === this.state.filter ||
          this.state.filter === 'All Categories'
        ) {
          gridItemsCopy[index].filtered = 0
        } else {
          gridItemsCopy[index].filtered = 1
        }
      })

      this.setState({
        title: 'Search Page Home',
        gridItems: gridItemsCopy,
      })
    }
  }

  sortPriceLowToHigh = () => {
    const gridItemsCopy = this.state.gridItems.slice()

    sort(gridItemsCopy).asc(item => item.price)

    this.setState({
      gridItems: gridItemsCopy,
      dropdownMessage: 'Price Low to High',
    })
  }

  sortPriceHighToLow = () => {
    const gridItemsCopy = this.state.gridItems.slice()

    sort(gridItemsCopy).desc(item => item.price)

    this.setState({
      gridItems: gridItemsCopy,
      dropdownMessage: 'Price High to Low',
    })
  }

  render() {
    return (
      <div>
        <Navbar
          value={this.state.value}
          filter={this.state.filter}
          dropDownCategories={this.state.dropDownCategories}
          changeFilter={this.changeFilter}
          handleChange={this.handleChange}
          send={this.send}
        />

        {this.props.location.pathname === '/' && (
          <div>
            <SearchResultPrompt
              title={this.state.title}
              filter={this.state.filter}
              resultsFound={this.state.resultsFound}
              sortPriceLowToHigh={this.sortPriceLowToHigh}
              sortPriceHighToLow={this.sortPriceHighToLow}
              dropdownMessage={this.state.dropdownMessage}
            />

            <AbsoluteGrid
              items={this.state.gridItems}
              itemWidth={240}
              itemHeight={400}
              responsive={true}
              sortProp="none"
            />
          </div>
        )}
      </div>
    )
  }
}
