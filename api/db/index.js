/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 *  This file is creates and exports access to our postgreSQL database. This
 *  gives an easy way for other modules to import access to the database, and
 *  allows for database configuration changes with minimal impact on other
 *  modules.
 */

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const imgUpload = require('./s3')
const pg = require('pg')
const pgp = require('pg-promise')()
const db = pgp(process.env.DATABASE_URL)

// Required!
pg.defaults.ssl = true

module.exports = {
  database: db,
  imageHandler: imgUpload.imageHandler,
  upload: imgUpload.upload,
}
