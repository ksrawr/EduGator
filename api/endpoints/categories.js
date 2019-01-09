/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 * Module containing routes that interface with the categories table.
 * This table is currently specified as read-only from the client.
 */

const express = require('express')
const router = express.Router()
const db = require('../db')

// Get all categories
router.get('/categories', (req, res) => {
  db.database
    .any('SELECT * FROM categories')
    .then(data => {
      res.json(data)
    })
    .catch(function(err) {
      res.send(err)
    })
})

module.exports = router
