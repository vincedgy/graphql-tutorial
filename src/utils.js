export const gracefulShutdown = (mongoose, logger) => {
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

/**
 * Mock for getUser
 * @param {M} token
 */
export const getUser = token => {
  return {
    token: token,
    authenticated: true,
    id: 12345,
    roles: ['user', 'admin']
  }
}
