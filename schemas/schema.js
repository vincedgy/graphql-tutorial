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
    age: { type: GraphQLInt }
  })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root query description',
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
