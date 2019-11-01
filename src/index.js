import 'dotenv/config'
import mongoConfig from './mongo'
import logger from 'loggy'
import mongoose from 'mongoose'

// Vars from env
const { MONGODB_HOST, MONGODB_NAME } = process.env
const PORT = process.env.PORT || 4000
const MONGODB_URI = `mongodb+srv://${MONGODB_HOST}/${MONGODB_NAME}?retryWrites=true&w=majority`

// Apollo Server definition
import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schemas/schema'
import resolvers from './schemas/resolvers'
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger
})
const server = new ApolloServer({ cors: true, schema })

// Open the connection to database
// Then start the app
mongoose
  .connect(MONGODB_URI, mongoConfig)
  .then(() => {
    server
      .listen(PORT)
      .then(({ url }) => {
        logger.log(`🚀 Server's ready at ${url}graphql`)
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
