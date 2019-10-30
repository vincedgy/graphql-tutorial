const _ = require('lodash')
const logger = require('loggy')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const { UserType, HobbyType, PostType } = require('./types_schemas')

const User = require('../model/User')
const Post = require('../model/Post')
const Hobby = require('../model/Hobby')

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
        return User.findById(args.id)
      }
    },
    hobby: {
      type: HobbyType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Hobby.findById(args.id)
      }
    },
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Post.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find()
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find()
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve() {
        return Hobby.find()
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
        let user = new User({ ...args })
        user
          .save()
          .then(() => logger.log('Created'))
          .catch(err => logger.error(err))
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
        logger.log('Post created')
        let post = new Post({ ...args })
        post
          .save()
          .then(() => logger.log('Created'))
          .catch(err => logger.error(err))
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
        logger.log('Hobby created')
        let hobby = new Hobby({ ...args })
        hobby
          .save()
          .then(() => logger.log('Created'))
          .catch(err => logger.error(err))
        return hobby
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
