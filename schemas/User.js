const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql

module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'Description of a User',
    fields: () => ({
      id: { type: GraphQLID, description: `User's id` },
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
