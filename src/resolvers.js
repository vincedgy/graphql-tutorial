import logger from 'loggy'
import User from './datasources/User'
import Person from './datasources/Person'
import Post from './datasources/Post'
import Hobby from './datasources/Hobby'

import { GraphQLDateTime } from 'graphql-iso-date'

export default {
  DATE_TIME: GraphQLDateTime,

  Query: {
    users: () => User.find(),
    user: (_, args) => User.findById(args.id),
    hobbies: () => Hobby.find(),
    hobby: (_, args) => Hobby.findById(args.id),
    posts: () => Post.find(),
    post: (_, args) => Post.findById(args.id),
    persons: () => Person.find(),
    person: (_, args) => Person.findById(args.id)
  },
  Mutation: {
    /**
     * User mutations
     */
    UpdateUser: async (_, args) => {
      const updatedUser = await User.findByIdAndUpdate(
        args.id,
        { ...args },
        { new: true }
      )
      return {
        success: updatedUser ? true : false,
        message: updatedUser
          ? `User ${updatedUser.id} is now updated`
          : `Failed to update the user ${args.id}`
      }
    },
    DeleteUser: async (_, { id }) => {
      const deletedUser = await User.findByIdAndDelete(id)
      return {
        success: deletedUser ? true : false,
        message: deletedUser
          ? `User ${deletedUser.id} is now deleted`
          : `Failed to create the user ${id}`
      }
    },
    CreateUser: async (_, args) => {
      const createdUser = await new User({
        ...args,
        creation: new Date()
      }).save()
      return {
        success: createdUser ? true : false,
        message: createdUser
          ? `User ${createdUser.id} is now created`
          : 'Failed to create the user'
      }
    },
    /**
     * Person mutations
     */
    UpdatePerson: async (_, args) => {
      const updatedPerson = await Person.findByIdAndUpdate(
        args.id,
        { ...args },
        { new: true }
      )
      return {
        success: updatedPerson ? true : false,
        message: updatedPerson
          ? `Person ${updatedPerson.id} is now created`
          : `Failed to update the user ${args.id}`
      }
    },
    DeletePerson: async (_, { id }) => {
      const deletedPerson = await Person.findByIdAndDelete(id)
      return {
        success: deletedPerson ? true : false,
        message: deletedPerson
          ? `Person ${deletedPerson.id} is now deleted`
          : `Failed to delete the user ${id}`
      }
    },
    CreatePerson: async (_, args) => {
      const createdPerson = await new Person({
        ...args,
        creation: new Date()
      }).save()
      return {
        success: createdPerson ? true : false,
        message: createdPerson
          ? `Person ${createdPerson.id} is now created`
          : `Failed to create the person ${args.id}`
      }
    },
    /**
     * Hobby mutations
     */
    UpdateHobby: async (_, args) => {
      const updatedHobby = await Hobby.findByIdAndUpdate(
        args.id,
        { ...args },
        { new: true }
      )
      return {
        success: updatedHobby ? true : false,
        message: updatedHobby
          ? `Hobby ${updatedHobby.id} is now updated`
          : `Failed to update the hobby ${args.id}`
      }
    },
    DeleteHobby: async (_, { id }) => {
      const deletedHobby = await Hobby.findByIdAndDelete(id)
      return {
        success: deletedHobby ? true : false,
        message: deletedHobby
          ? `Hobby ${deletedHobby.id} is now deleted`
          : `Failed to delete the hobby ${id}`
      }
    },
    CreateHobby: async (_, args) => {
      const createdHobby = await new Hobby({
        ...args,
        status: args.status || 'UNDEFINED',
        creation: new Date()
      }).save()
      return {
        success: createdHobby ? true : false,
        message: createdHobby
          ? `Hobby ${createdHobby.id} is now created`
          : `Failed to create the hobby ${args.id}`
      }
    },
    /**
     * Post mutations
     */
    UpdatePost: async (_, args) => {
      const updatedPost = await Post.findByIdAndUpdate(
        args.id,
        { ...args },
        { new: true }
      )
      return {
        success: updatedPost ? true : false,
        message: updatedPost
          ? `Post ${updatedPost.id} is now updated`
          : `Failed to update the post ${args.id}`
      }
    },
    DeletePost: async (_, { id }) => {
      const deletedPost = await Post.findByIdAndDelete(id)
      return {
        success: deletedPost ? true : false,
        message: deletedPost
          ? `Post ${deletedPost.id} is now deleted`
          : `Failed to delete the post ${id}`
      }
    },
    CreatePost: async (_, args) => {
      const createdPost = await new Post({
        ...args,
        creation: new Date()
      }).save()
      return {
        success: createdPost ? true : false,
        message: createdPost
          ? `Post ${createdPost.id} is now created`
          : `Failed to create the post ${args.id}`
      }
    }
  },

  /**
   * User resolvers
   */
  User: {
    posts: async ({ id }) => {
      logger.log(`Looking for posts of user ${id}`)
      const posts = await Post.find()
        .where('userId')
        .equals(id)
      return posts
    },
    hobbies: ({ id }) => {
      logger.log(`Looking for hobbies of user ${id}`)
      return Hobby.find()
        .where('userId')
        .equals(id)
    },
    person: async ({ id }) => {
      logger.log(`Looking for the person of user ${id}`)
      return Person.findOne({ userId: id })
    }
  },

  /**
   * Hobby resolvers
   */
  Hobby: {
    user: ({ id, userId }) => {
      logger.log(`Looking for user ${userId} of hobby ${id}`)
      return User.findById(userId)
    }
  },

  /**
   * Post resolvers
   */
  Post: {
    user: ({ id, userId }) => {
      logger.log(`Looking for user ${userId} of post ${id}`)
      return User.findById(userId)
    }
  },

  /**
   * Person resolvers
   */
  Person: {
    user: ({ id, userId }) => {
      logger.log(`Looking for user ${userId} of person ${id}`)
      return User.findById(userId)
    }
  }
}
