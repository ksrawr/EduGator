/*
 *  CSC 648-01 FALL 2018, Team 03
 *  A route for receive and return message, and post message to database
 */

const express = require('express')
const router = express.Router()

// Gives access to the database
const db = require('../db')

// get messages from sender
router.get('/messages/sender/:email', (req, res) => {
  db.database
    .any('SELECT message FROM messages WHERE sender = $1', req.params.email)
    .then(data => {
      return res.json(data)
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

// get message from reciever
router.get('/messages/reciever/:email', (req, res) => {
  db.database
    .any('SELECT message FROM messages WHERE reciever = $1', req.params.email)
    .then(data => {
      return res.json(data)
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

// Get all messages
router.get('/messages', (req, res) => {
  db.database
    .any('SELECT * FROM messages')
    .then(data => {
      return res.json(data)
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})
// Get all messages
router.post('/messages/sent',  (req, res) => {
  let email = req.body.email
  db.database
    .any(`SELECT *
      FROM messages
      WHERE sender = $1`,
       email
     )
    .then(data => {
      return res.json(data)
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

// Get all messages
router.post('/messages/receiver',  (req, res) => {
  let email = req.body.email
  db.database
    .any(`SELECT *
      FROM messages
      WHERE reciever = $1`,
       email
     )
    .then(data => {
      return res.json(data)
    })
    .catch(function(err) {
      console.log('error!')
      console.log(err)
    })
})

// Add message to the message table
router.post('/addMessage', (req, res) => {
  const { sender, reciever, message } = req.body
  db.database
    .any(
      `INSERT INTO messages (sender, reciever, message)
                 VALUES ($1, $2, $3)`,
      [sender, reciever, message]
    )
    .then(results => res.json(results))
    .catch(error => {
      console.log(error)
      res.json({ error })
    })
})

module.exports = router
