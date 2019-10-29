const _ = require('lodash')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const { UserType, HobbyType, PostType } = require('./types_schemas')

const usersData = require('./users.json')
const hobbyData = require('./hobbies.json')
const postData = require('./posts.json')

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
        return _.find(usersData, { id: args.id })
      }
    },
    hobby: {
      type: HobbyType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(hobbyData, { id: args.id })
      }
    },
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(postData, { id: args.id })
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return usersData
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return postData
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve() {
        return hobbyData
      }
    }
  }
})

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log('User created')
        let user = { ...args }
        return user
      }
    },
    CreatePost: {
      type: PostType,
      args: {
        comment: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        console.log('Post created')
        let post = { ...args }
        return post
      }
    },
    CreateHobby: {
      type: HobbyType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        console.log('Hobby created')
        let post = { ...args }
        return post
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
