/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  This is the main file from which the backend will be run from. Any scripts
 *  to start up the backend should point to this file!
 *
 *  To keep this file as modular as possible, please try to keep this
 *  file from doing any sort of heavy logical processing, and delegate those
 *  responsibilities to other modules.
 */

const express = require('express')
const app  = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const sessionConfig = require('../config/session')
const passport = require('passport')
 // listens on port 5000 when running locally
const port = process.env.PORT || 5000
const router = express.Router()


// All the endpoints for a backend come with this import
const endpoints = require('./endpoints')

// Set up bodyparser to allow for json requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//Use cookie-parser to access cookies stored in the browser
app.use(cookieParser())

app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
// Statically serve the front-end index.html file
app.use(express.static(path.join(__dirname, '/../client/build')))

// Sets the routes in testSearch to be relative to '/' (the root)
app.use('/', endpoints)

// Catch all for any unspecified routes.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/../client/build/index.html'))
})

// Start listening for activity on the specified port
app.listen(port, () => console.log(`Listening on port ${port}`))
