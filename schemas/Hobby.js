const graphql = require('graphql')

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql

module.exports = new GraphQLObjectType({
  name: 'Hobby',
  description: 'What a pleasure to have a great hobby in life',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The type of the hobby'
    },
    title: {
      type: GraphQLString,
      description: "The hobby's title"
    },
    description: {
      type: GraphQLString,
      description: "The hobby's description"
    }
  })
})

