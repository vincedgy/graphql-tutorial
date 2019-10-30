const express = require('express')
const logger = require('loggy')
const graphql = require('express-graphql')
const { MONGODB_HOST, MONGODB_NAME, MONGODB_CONFIG } = require('./config')

const mongoose = require('mongoose')
const schema = require('./schemas/schema')

const app = express()

// Declare app
app
  .use(
    '/graphql',
    graphql({
      graphiql: true,
      schema: schema
    })
  )
  .use(function(err, req, res, next) {
    logger.error(err.stack)
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })

logger.info('Starting...')

// Open the connection to database
mongoose
  .connect(
    'mongodb+srv://' +
      MONGODB_HOST +
      '/' +
      MONGODB_NAME +
      '?retryWrites=true&w=majority',
    MONGODB_CONFIG
  )
  .catch(err => {
    logger.error('Error during mongoDB connection', err)
  })

// Listen to db opened
mongoose.connection.on('open', () => {
  logger.log(`Connected to database ${MONGODB_NAME} on ${MONGODB_HOST}`)
  // Run app
  app.listen(4000, () => {
    logger.info('Server is running on [http://localhost:4000/graphql].')
  })
})
