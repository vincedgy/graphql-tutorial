import logger from 'loggy'

import User from './datasources/User'
import Person from './datasources/Person'
import Post from './datasources/Post'
import Hobby from './datasources/Hobby'

import { GraphQLDateTime } from 'graphql-iso-date'

const Response = (success, message) => ({
  success: success,
  message: message
})

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
    UpdateUser: (_, args) => {
      return User.findByIdAndUpdate(args.id, { ...args }, { new: true })
        .then(updatedUser => {
          return new Response(true, `User ${updatedUser.id} is now updated`)
        })
        .catch(err => {
          return new Response(false, err)
        })
    },
    DeleteUser: (_, { id }) => {
      return User.findByIdAndDelete(id)
        .then(() => logger.log(`User ${id} is deleted`))
        .catch(err => logger.error(err))
    },
    CreateUser: async (_, args) => {
      const createdUser = await new User({
        ...args,
        creation: new Date()
      }).save()

      return {
        success: createdUser !== undefined,
        message: createdUser ? `User ${createdUser.id} is now created` : 'Fail to create the user'
      }

    },
    /**
     * Person mutations
     */
    UpdatePerson: (_, args) => {
      return Person.findByIdAndUpdate(args.id, { ...args }, { new: true })
        .then(updatedPerson => {
          logger.log(`Person ${args.id} is now updated`)
          return updatedPerson
        })
        .catch(err => logger.error(err))
    },
    DeletePerson: (_, { id }) => {
      return Person.findByIdAndDelete(id)
        .then(() => logger.log(`Person ${id} is deleted`))
        .catch(err => logger.error(err))
    },
    CreatePerson: (_, args) => {
      let newPerson = new Person({ ...args, creation: new Date() })
      newPerson
        .save()
        .then(() => logger.log('Person created'))
        .catch(err => logger.error(err))
      return newPerson
    },
    /**
     * Hobby mutations
     */
    UpdateHobby: (_, args) => {
      return Hobby.findByIdAndUpdate(args.id, { ...args }, { new: true })
        .then(updatedHobby => {
          logger.log(`Hobby ${args.id} is now updated`)
          return updatedHobby
        })
        .catch(err => logger.error(err))
    },
    DeleteHobby: (_, { id }) => {
      return Hobby.findByIdAndDelete(id)
        .then(() => logger.log(`Hobby ${id} is deleted`))
        .catch(err => logger.error(err))
    },
    CreateHobby: (_, args) => {
      let newHobby = new { ...args, creation: new Date() }()
      newHobby
        .save()
        .then(() => logger.log('Hobby created'))
        .catch(err => logger.error(err))
      return newHobby
    },
    /**
     * Post mutations
     */
    UpdatePost: (_, args) => {
      return Post.findByIdAndUpdate(args.id, { ...args }, { new: true })
        .then(updatedPost => {
          logger.log(`Post ${args.id} is now updated`)
          return updatedPost
        })
        .catch(err => logger.error(err))
    },
    DeletePost: (_, { id }) => {
      return Post.findByIdAndDelete(id)
        .then(() => logger.log(`Post ${id} is deleted`))
        .catch(err => logger.error(err))
    },
    CreatePost: (_, args) => {
      let newPost = new Hobby({ ...args, creation: new Date() })
      newPost
        .save()
        .then(() => logger.log('Post created'))
        .catch(err => logger.error(err))
      return newPost
    }
  },

  /**
   * User resolvers
   */
  User: {
    posts: ({ id }) => {
      logger.info('Looking for posts for ' + id)
      return Post.find()
        .where('userId')
        .equals(id)
    },
    hobbies: ({ id }) => {
      logger.info('Looking for hobbies for ' + id)
      return Hobby.find()
        .where('userId')
        .equals(id)
    },
    person: ({ id }) => {
      logger.info('Looking for person for ' + id)
      return Person.find()
        .where('userId')
        .equals(id)
    }
  },

  /**
   * Hobby resolvers
   */
  Hobby: {
    user: ({ userId }) => {
      return User.findById(userId)
    }
  },

  /**
   * Post resolvers
   */
  Post: {
    user: ({ userId }) => {
      return User.findById(userId)
    }
  }
}
