const graphql = require('graphql')

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
    }
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
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
