import logger from 'loggy'
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

import { UserType, HobbyType, PostType } from './types_schemas'

import User from '../model/User'
import Post from '../model/Post'
import Hobby from '../model/Hobby'

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
        logger.info('Looking for users')
        return User.find()
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        logger.info('Looking for posts')
        return Post.find()
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve() {
        logger.info('Looking for hobbies')
        return Hobby.find()
      }
    }
  }
})

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    /**
     *
     */
    CreateUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
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

    /**
     *
     */
    UpdateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(args.id, {...args})
          .then(() => logger.log('Updated'))
          .catch(err => logger.error(err))
      }
    },

    /**
     *
     */
    CreatePost: {
      type: PostType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        logger.log('Post created')
        let post = new Post({ ...args, creation: new Date() })

        post
          .save()
          .then(a => logger.log(a))
          .catch(err => logger.error(err))
        return post
      }
    },
    CreateHobby: {
      type: HobbyType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        logger.log('Hobby created')
        let hobby = new Hobby({ ...args, creation: new Date() })
        hobby
          .save()
          .then(() => logger.log('Created'))
          .catch(err => logger.error(err))
        return hobby
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
