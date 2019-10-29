const _ = require('lodash')
const { GraphQLObjectType, GraphQLID, GraphQLSchema } = require('graphql')

const usersData = require('./users.json')
const hobbyData = require('./hobbies.json')
const postData = require('./posts.json')

const UserType = require('./User')
const HobbyType = require('./Hobby')
const PostType = require('./Post')

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
    },
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        if (args.id) {
          return _.find(postData, { id: args.id })
        }
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
