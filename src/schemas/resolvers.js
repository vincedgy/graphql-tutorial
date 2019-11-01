import logger from 'loggy'

import User from '../datasources/model/User'
import Post from '../datasources/model/Post'
import Hobby from '../datasources/model/Hobby'

export default {
  Query: {
    users: (parent, args, context, info) => User.find(),
    user: (parent, args, context, info) => User.findById(args.id),
    hobbies: (parent, args, context, info) => Hobby.find(),
    hobby: (parent, args, context, info) => Hobby.findById(args.id),
    posts: (parent, args, context, info) => Post.find(),
    post: (parent, args, context, info) => Post.findById(args.id)

  },
  Mutation: {
    UpdateUser: (parent, args, context, info) => {
      return User.findByIdAndUpdate(args.id, { ...args }, { new: true })
        .then(newUser => {
          logger.log(`User ${args.id} is now updated`)
          return newUser
        })
        .catch(err => logger.error(err))
    },
    DeleteUser: (parent, args, context, info) => {
      return User.findByIdAndDelete(args.id)
        .then(() => logger.log(`User ${args.id} is deleted`))
        .catch(err => logger.error(err))
    },
    CreateUser: (parent, args, context, info) => {
      let user = new User({ ...args })
      user
        .save()
        .then(() => logger.log('Created'))
        .catch(err => logger.error(err))
      return user
    }
  },

  User : {
    posts: (parent, args, context, info)  => {
      logger.info('Looking for posts for ' + parent.id)
        return Post.find()
          .where('userId')
          .equals(parent.id)
    },
    hobbies: (parent, args, context, info)  => {
      logger.info('Looking for hobbies for ' + parent.id)
        return Hobby.find()
          .where('userId')
          .equals(parent.id)
    }
  },

  Hobby: {
    user: (parent, args, context, info)  => {
      return User.findById(parent.userId)
    }
  },

  Post: {
    user: (parent, args, context, info)  => {
      return User.findById(parent.userId)
    }
  }


}
