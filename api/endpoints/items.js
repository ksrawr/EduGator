/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  Routes for posting and retrieving item posts.
 */

const express = require('express')
const thumbnailer = require('sharp')
const router = express.Router()
const auth = require('../controllers/authentication')
// Gives access to the database
const db = require('../db')

// Get all items
router.get('/items', (req, res) => {
  db.database
    .any('SELECT * FROM items')
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

// Get items posted by a particular user
router.get('/items/:email', (req, res) => {
  db.database
    .any('SELECT * FROM items WHERE email = $1', req.params.email)
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

//updates approval status of a pending item
router.put('/updateStatus/:itemId', (req, res) => {
  db.database
    .any(
      `UPDATE items
      SET approval_status = 'active'
      WHERE
      post_id = $1;`,
      req.params.itemId
    )
    .then(data => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.send(err)
    })
})

// Add an item
// include lazy registration
router.post('/addItem', db.imageHandler.single('avatar'), (req, res) => {
  const { email, name, category, description, price, condition } = req.body
//i think this is where user check will happen,
//if user is not logged in I dont know what to do
  var originalLink
  var thumbnailLink

  db.upload(req.file.buffer) // Upload original
    .then(data => {
      originalLink = data.Location
      thumbnailer(req.file.buffer) // Create a thumbnail
        .resize(240, 200)
        .toBuffer()
        .then(outputBuffer => {
          db.upload(outputBuffer) // Upload thumbnail
            .then(data => {
              thumbnailLink = data.Location
              db.database
                .any(
                  `INSERT INTO items (email, name, category, description, price, condition, image_path, thumbnail)
          	             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                  [
                    email,
                    name,
                    category,
                    description,
                    price,
                    condition,
                    originalLink,
                    thumbnailLink,
                  ]
                )
                .then(results => res.json(results)) // Send back response on success
                .catch(error => {
                  console.log(error)
                  res.json({ error })
                })
                .catch(err => {
                  console.log(err)
                  res.send(err)
                })
            })
            .catch(err => {
              console.log(err)
              res.send(err)
            })
        })
        .catch(err => {
          console.log(err)
          res.send(err)
        })
    })
})

module.exports = router
