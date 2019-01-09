/*
 *  CSC 648-01 FALL 2018, Team 03
 *  A route for post and retrieve tutor services
 */

const express = require('express')
const router = express.Router()

// Gives access to the database
const db = require('../db')

// Get all tutor services
router.get('/tutorServices', (req, res) => {
  db.database
    .any('SELECT * FROM tutors')
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

// Add a single tutor service
router.post('/addTutorService', (req, res) => {
  const { email, name, description, price, course, imagePath } = req.body
  db.database
    .any(
      `INSERT INTO tutors (email, name, description, price, course, image_Path)
		             VALUES ($1, $2, $3, $4, $5, $6)`,
      [email, name, description, price, course, imagePath]
    )
    .then(results => res.json(results))
    .catch(error => {
      console.log(error)
      res.json({ error })
    })
})

module.exports = router
