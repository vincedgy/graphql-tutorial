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
