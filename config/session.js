
/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 * Config file for express-session data
 *
 */
const express = require('express')

if (process.env.NODE_ENV== "development")
{
  require('dotenv').config()
}

session = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  email: '',
  userId: -1,
  roles: '',
  cookie: {
    exp: 10000


  }
}

module.exports = session;
