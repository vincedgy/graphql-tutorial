const graphql = require('graphql')
const _ = require('lodash')

// Dumy usersData
const usersData = [
  {
    id: '1',
    name: 'John Snow',
    age: 22,
    profession: 'Hero'
  },
  {
    id: '2',
    name: 'Arya Stark',
    age: 15
  },
  {
    id: '3',
    name: 'Daenerys Targaryan',
    age: 24
  },
  {
    id: '4',
    name: 'Sansa Baratheon',
    age: 19
  }
]

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'Description of a User',
  fields: () => ({
    id: { type: GraphQLString, description: `User's id` },
    name: {
      type: GraphQLString,
      description: "The name of the user. Can't be null"
    },
    age: {
      type: GraphQLInt,
      description: 'Yes, it is actually the age of te user !'
    },
    profession: { type: GraphQLString, description: `User's profession` }
  })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'The root query',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        if (args.id) {
          return _.find(usersData, { id: args.id })
        } else {
          return {}
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
