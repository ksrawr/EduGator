/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  This file is for implementing different passport strategies. Currently,
 *  passport-local and passport-jwt have been implemented. Other strategies
 *  should be declared in this file. ex: google, twitter, facebook, etc.
 *
 *  Docs for passport.js can be found here: http://www.passportjs.org/
 */
const passport = require('passport')
const config = require('../../config/config')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const db = require('../db')
const localOptions = { usernameField: 'email' }
const registerOptions = {
    usernameField: 'email',
    passwordField: 'password'
  }
const user = {
  email: '',
  userId: -1,
  roles: ''
}

//passport strategy for local registration
passport.use('localRegister', new LocalStrategy(registerOptions,
  ( email, password, done) => {
  var saltRounds = 8

  //If form validation on front end fails and user does not provide an email/password
  if (!email | !password) {
    res
      .status(422)
      .send({ error: 'You must enter an email and password to sign in' })
  }
  //Hashes the password using bcrypt before inserting into the database
  bcrypt.hash(password, saltRounds)
    .then(hash => {
      return db.database
        .oneOrNone(
          `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING user_id, roles
        AS roles`,
          [email, hash]
        )
        .then(newUser => {
          return done(null, newUser)

        })
        .catch(err => {
          return done(err, false)
        })
    })
    .catch(err => {
      return done(err, false)
    })
}))

//Passport strategy for login using passport-local
passport.use('localLogin', new LocalStrategy(localOptions, (email, password, done) => {
  return db.database
    .oneOrNone(
      `SELECT password, user_id, roles
     FROM users
     WHERE email = $1
     `, email
    )
    .then(validUser => {
      if(validUser){
        bcrypt.compare(password, validUser.password)
        .then(validPassword => {
          if (validPassword) {
            user.email = email
            user.userId = validUser.user_id
            user.roles = validUser.roles
            return done(null, user)
          }
          return done(null, false)
        })
      }
      else{
        return done(null, false)
      }
    })
    .catch(err =>{
      done(err, false)
    })
    .catch(err =>{
      done(err, false)
    })
}))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
}

//Passport strategy using JSON web tokens
const jwtLogin = new JWTStrategy(jwtOptions, (payload, done) => {
  return db.database
    .oneOrNone(
      `
    SELECT email
    FROM users
    WHERE email = $1`,
      payload.sub
    )
    .then(foundUser => {
      if (foundUser) {
        return done(null, foundUser)
      }
      return done(null, false)
    })
    .catch(err => done(err, false))
})


//Creates a new user session
passport.serializeUser(function(user, done) {
  session.email =  user.email
  session.userId = user.userId
  session.roles = user.roles
    done(null, user);
})

//Called when verifying a user is logged in
passport.deserializeUser(function(user, done) {
  if(user.userId === session.userId){
    done(null, user)
  }
  else{
    done(null, false)
  }
})

passport.use(jwtLogin)
