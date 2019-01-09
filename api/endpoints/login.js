/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  This file contains routes for logging in a new user.
 *  These routes use a middleware called passport that allows for different types
 *  of authentication strategies.
 *  Formatting for protected routes using specific authentications are listed
 *  below.
 */
const express = require('express')
const router = express.Router()

//Imports that allows for different authentication strategies using passport.js
//passport.js is a middleware for express that is used to authenticate requests
const auth = require('../controllers/authentication')
const passport = require('passport')
const passportController = require('../controllers/passport')

const requireAuth = passport.authenticate('localLogin', { session: true })
const jwtAuth = passport.authenticate('jwt', { session: false })

//This is the format for a route being authorized with passport-local login
router.post('/login', requireAuth, (req, res) => {
  res.send({email: req.body.email, token: auth.tokenForUser(req.user.userId)})
})

router.get('/checkroute', auth.checkAuthentication, (req, res)=>{
  res.sendStatus(200)
})

router.get('/protectedadminroute', auth.checkAuthentication, auth.checkAdminRole, (req, res) => {
  res.sendStatus(200)
})

module.exports = router
