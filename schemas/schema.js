const _ = require('lodash')
const { GraphQLObjectType, GraphQLID, GraphQLSchema } = require('graphql')

const usersData = require('./users.json')
const hobbyData = require('./hobbies.json')
const UserType = require('./User')
const HobbyType = require('./Hobby')

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'The root query',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        if (args.id) {
          return _.find(usersData, { id: args.id })
        }
      }
    },
    hobby: {
      type: HobbyType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        if (args.id) {
          return _.find(hobbyData, { id: args.id })
        }
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
