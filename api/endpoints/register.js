/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  This file is for registering a new user, it calls a passport-local strategy
 *  to authenticate the user
 */
const express = require('express')
const router = express.Router()
const passport = require('passport')
const auth = require('../controllers/authentication')
const passportController = require('../controllers/passport')
const requireAuth = passport.authenticate('localRegister', { session: true })

router.post('/register', requireAuth, auth.checkAuthentication, (req, res) => {
  res.sendStatus(200)
})

module.exports = router
