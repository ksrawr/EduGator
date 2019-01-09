/*
 *  CSC 648-01 FALL 2018, Team 03
 *
 * Module that allows for interaction with the Amazon S3 bucket
 */

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const multer = require('multer')
const aws = require('aws-sdk')

// Keys required for access to the S3 image bucket
const accessKey = process.env.AWSAccessKeyId
const secretKey = process.env.AWSSecretKey
const creds = new aws.Credentials(accessKey, secretKey, null)

aws.config.update({
  credentials: creds,
  secretAccessKey: accessKey,
  accessKeyId: secretKey,
  region: 'us-west-1',
})
const s3 = new aws.S3()

const storage = multer.memoryStorage()
const maxFileSize = 12 * 1024 * 1024 // 12 MB limit
const imgHandler = multer({
  storage: storage,
  limits: {
    fileSize: maxFileSize,
  },
})

// Upload a file in a buffer to S3
function uploadToS3(fileBuffer) {
  var params = {
    ACL: 'public-read',
    Bucket: 'edugator-items',
    Key: Date.now().toString(),
    Body: fileBuffer,
  }

  return s3.upload(params).promise()
}

module.exports = {
  upload: uploadToS3,
  imageHandler: imgHandler,
}
