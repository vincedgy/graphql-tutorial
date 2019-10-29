const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql
const users = require('./users.json')
const UserType = require('./User')

module.exports = new GraphQLObjectType({
  name: 'Post',
  description: 'This is a post the we can share between users',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The type of post\'id'
    },
    comment: {
      type: GraphQLString,
      description: "The core content of the post"
    },
    user: {
      type: UserType,
      description: 'The author of the post',
      resolve(parent) {
        return _.find(users, { id: parent.userId })
      }
    }
  })
})

