/*
 *  CSC 648-01 FALL 2018, Team 03
 *  A route to post and retrieve course books
 */

const express = require('express')
const router = express.Router()

// Gives access to the database
const db = require('../db')

// Get all of course books
router.get('/courseBooks', (req, res) => {
  db.database
    .any('SELECT * FROM course_books')
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

// Add a single course book
router.post('/addCourseBook', (req, res) => {
  const {
    email,
    name,
    description,
    price,
    condition,
    course,
    imagePath,
  } = req.body
  db.database
    .any(
      `INSERT INTO course_books (email, name, description, price, condition, course, image_Path)
		   			 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [email, name, description, price, condition, course, imagePath]
    )
    .then(results => res.json(results))
    .catch(error => {
      console.log(error)
      res.json({ error })
    })
})

module.exports = router
