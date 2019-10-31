import 'dotenv/config'
import mongoConfig from './mongo'
import express from 'express'
import cors from 'cors'
import logger from 'loggy'
import graphql from 'express-graphql'
import mongoose from 'mongoose'
import schema from './schemas/schema'

const app = express()

const PORT = process.env.PORT || 4000

// Declare app
app
  .use(cors())
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
      process.env.MONGODB_HOST +
      '/' +
      process.env.MONGODB_NAME +
      '?retryWrites=true&w=majority',
    mongoConfig
  )
  .catch(err => {
    logger.error('Error during mongoDB connection', err)
  })

// Listen to connection 'open' event
mongoose.connection.on('open', () => {
  logger.log(
    `Connected to Mongodb Atlas on ${process.env.MONGODB_NAME} on ${process.env.MONGODB_HOST}`
  )
  // Run app
  app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`)
    logger.info(`You should open an url on {host}:${PORT}/graphql`)
  })
})

// Gracefull shutdown
const gracefulShutdown = () => {
  mongoose.connection
    .close()
    .then(() => {
      logger.log('Closing connection to database gently.')
      process.exit(0)
    })
    .catch(err => {
      logger.log(err)
      process.exit(1)
    })
}
process.once('SIGINT', gracefulShutdown)
process.once('SIGHUP', gracefulShutdown)
process.once('SIGUSR2', gracefulShutdown)

export default app
