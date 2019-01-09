/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  This file is a middleware for user registration routes. This file also
 *  allows for creating and delivering JSON web tokens for a given user
 *
 */
const jwt = require('jwt-simple')
const config = require('../../config/config')
const db = require('../db')

//Generates a JWT for a given user
function tokenForUser (user){
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user, iat: timestamp }, process.env.SECRET)
}

const sendToken = (req, res, next) =>{
  res.send({token: tokenForUser(req.user)})
}

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).end()
  }
}

//if user is admin or user, pass them through
function checkUserRole(req, res, next) {
  if (req.isAuthenticated() && (req.session.passport.user.roles === 'admin' | 'user')) {
    next()
  } else {
    res.status(401).end()
  }
}

function checkAdminRole(req, res, next) {
  if (req.isAuthenticated() && (req.session.passport.user.roles === 'admin')) {
    next()
  } else {
    //res.statusMessage('You must be an admin to access this part of the site')
    res.status(401).end()
  }
}

module.exports = { checkAdminRole, checkUserRole, checkAuthentication, tokenForUser }
