/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  This file is for demonstrating routing and the use of SQL queries through
 *  pg-promise to interact with our postgreSQL database.

 *  This file gives examples on how to:
 *  1. Syntax for defining a route
 *  2. How to write a couple different SELECT queries against the database
 *  3. How to return fetched data to the caller on the route.
 *  4. How to catch errors from pg-promise
 *
 *  Note: This isn't the limit of what you can do on a single route, but a few
 *        simple examples of how to search the database.
 */

const express = require('express')
const router = express.Router()

// Gives access to the database
const db = require('../db')

router.get('/', (req, res) => {
  res.render('index')
})

// Routing GET example
router.get('/test', (req, res) => {
  // Use console.log() to display messages to the terminal
  // This is really useful for debugging!!!
  console.log('Visited the Search Page!')
})

// Get all of a particular item from a table
router.get('/users', (req, res) => {
  db.database
    .any('SELECT * FROM users') // returns all items in the users table
    .then(data => {
      // pgp.any returns a promise, handle if the promise is accepted
      res.send(JSON.stringify(data))
    })
    .catch(function(err) {
      // Handle error if the promise rejects!
      console.log('error!')
      console.log(err)
    })
})

// Searching for items that match a column parameter
router.get('/categorySearch/:category', (req, res) => {
  // Return all items that match the category supplied from the request on this route
  db.database
    .any('SELECT * FROM items WHERE category = $1', req.params.category)
    .then(data => {
      return res.json(data)
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

// Searching for items that match a column parameter with regex
router.get('/textSearch/:searchString', (req, res) => {
  // Use % like using an SQL query to search for items with descriptions that
  // contain the text passed by the request on this route.
  db.database
    .any(
      "SELECT * FROM items WHERE LOWER(description) LIKE LOWER('%$1#%')",
      req.params.searchString
    )
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

// Searching for all distinct column values in a single column in a table.
router.get('/categories', (req, res) => {
  // Get a set of all categories in the items table. Note, because this is a set,
  // there should not be duplicates of any of the category names.
  db.database
    .any('SELECT DISTINCT category FROM items')
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

module.exports = router
