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
     * User's Mutations
     */
    CreateUser: {
      type: UserType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The name of the new user'
        },
        age: { type: GraphQLInt, description: 'The age of the new user' },
        profession: {
          type: GraphQLString,
          description: 'The profession of the new user'
        }
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

    UpdateUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The user's id to be updated"
        },
        name: { type: GraphQLString, description: 'The new name' },
        age: { type: GraphQLInt, description: 'The new age' },
        profession: { type: GraphQLString, description: 'The new profession' }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(args.id, { ...args }, { new: true })
          .then(newUser => {
            logger.log(`User ${args.id} is now updated`)
            return newUser
          })
          .catch(err => logger.error(err))
      }
    },

    DeleteUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the user to delete'
        }
      },
      resolve(parent, args) {
        return User.findByIdAndDelete(args.id)
          .then(() => logger.log(`User ${args.id} is deleted`))
          .catch(err => logger.error(err))
      }
    },

    /**
     * Post's mutations
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

    UpdatePost: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The post's id to be updated"
        },
        comment: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The new comment'
        }
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(args.id, { ...args }, { new: true })
          .then(newPost => {
            logger.log(`Post ${args.id} is now updated`)
            return newPost
          })
          .catch(err => logger.error(err))
      }
    },

    DeletePost: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the post to delete'
        }
      },
      resolve(parent, args) {
        return Post.findByIdAndDelete(args.id)
          .then(() => logger.log(`Post ${args.id} is deleted`))
          .catch(err => logger.error(err))
      }
    },

    /**
     * Hobby's mutations
     */
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
    },
    UpdateHobby: {
      type: HobbyType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: "The hobby's id to be updated"
        },
        title: { type: GraphQLString, description: 'The new title' },
        description: { type: GraphQLString, description: 'The new description' }
      },
      resolve(parent, args) {
        return Hobby.findByIdAndUpdate(args.id, { ...args }, { new: true })
          .then(newHobby => {
            logger.log(`Hobby ${args.id} is now updated`)
            return newHobby
          })
          .catch(err => logger.error(err))
      }
    },
    DeleteHobby: {
      type: HobbyType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the hobby to delete'
        }
      },
      resolve(parent, args) {
        return Hobby.findByIdAndDelete(args.id)
          .then(() => logger.log(`Hobby ${args.id} is deleted`))
          .catch(err => logger.error(err))
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
