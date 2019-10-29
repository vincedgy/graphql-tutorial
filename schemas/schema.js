const _ = require('lodash')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const usersData = require('./users.json')
const hobbyData = require('./hobbies.json')
const postData = require('./posts.json')

const HobbyType = new GraphQLObjectType({
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
    },
    user: {
      type: UserType,
      resolve(parent) {
        return _.find(usersData, { id: parent.userId })
      }
    }
  })
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This is a post the we can share between users',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "The type of post'id"
    },
    comment: {
      type: GraphQLString,
      description: 'The core content of the post'
    },
    user: {
      type: UserType,
      resolve(parent) {
        return _.find(usersData, { id: parent.userId })
      }
    }
  })
})

const UserType = new GraphQLObjectType({
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
    profession: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent) {
        return _.filter(postData, { userId: parent.id })
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent) {
        return _.filter(hobbyData, { userId: parent.id })
      }
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
    }
  }
})

// Mutation
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
