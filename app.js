const express = require('express')
const graphql = require('express-graphql')
const schema = require('./schemas/schema')
const app = express()

app.use(
  '/graphql',
  graphql({
    graphiql: true,
    schema: schema
  })
)

app.listen(4000, () => {
  console.log('Listening on 4000')
})
