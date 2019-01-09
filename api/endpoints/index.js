/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  This file is for convenience of importing all routes in the endpoints
 *  directory. This abstracts away the need for the main server file to know
 *  what all the endpoints are, and allows for changing of the routes without
 *  having to modify the main server file.
 *
 *   PLEASE ADD ANY NEWLY CREATED ROUTES TO THIS FILE.
 */

const express = require('express')
const router = express.Router()

// Require any endpoints you would like to add to the backend.
const test = require('./searchExample')
const login = require('./login')
const items = require('./items')
const tutorServices = require('./tutors')
const courseBooks = require('./courseBooks')
const message = require('./messages')
const categories = require('./categories')
const register = require('./register')

// Have the router use the endpoints that were imported.
router.use('/test', test)
router.use('/api', login)
router.use('/api', register)
router.use('/api', items)
router.use('/api', tutorServices)
router.use('/api', courseBooks)
router.use('/api', message)
router.use('/api', categories)

// Export the router for use by the main server file.
module.exports = router
