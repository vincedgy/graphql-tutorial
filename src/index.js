import 'dotenv/config'
import mongoConfig from './mongo'
import logger from 'loggy'
import mongoose from 'mongoose'

// Vars from env
const { MONGODB_HOST, MONGODB_NAME } = process.env
const PORT = process.env.PORT || 4000
const MONGODB_URI = `mongodb+srv://${MONGODB_HOST}/${MONGODB_NAME}?retryWrites=true&w=majority`

// Utils and API
import { getUser } from './utils'

// Apollo Server definition
import { ApolloServer, AuthenticationError } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './schema'
import resolvers from './resolvers'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger
})

const server = new ApolloServer({
  cors: true,
  schema,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || ''

    // try to retrieve a user with the token
    const user = getUser(token)

    // optionally block the user
    // we could also check user roles/permissions here
    if (!user) throw new AuthenticationError('you must be logged in')

    // add the user to the context
    return { user }
  }
})

// Open the connection to database
// Then start the app
mongoose
  .connect(MONGODB_URI, mongoConfig)
  .then(() => {
    server
      .listen(PORT)
      .then(({ url }) => {
        logger.info(`🚀 Server's ready at ${url}graphql`)
      })
      .catch(err => {
        logger.error('FATAL : Error while server startup', err)
        process.exit(1)
      })
  })
  .catch(err => {
    logger.error('FATAL : Error while mongoDB connection', err)
    process.exit(1)
  })

export default server
