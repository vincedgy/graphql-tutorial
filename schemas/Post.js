const graphql = require('graphql')

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql

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
    }
  })
})

