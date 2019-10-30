const logger = require('loggy')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const User = require('../model/User')
const Post = require('../model/Post')
const Hobby = require('../model/Hobby')

/**
 *
 */
const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'Represents a person type',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    isMarried: { type: GraphQLBoolean }
  })
})

/**
 *
 */
const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'What a pleasure to have a great hobby in life',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The type of the hobby'
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The hobby's title"
    },
    description: {
      type: GraphQLString,
      description: "The hobby's description"
    },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId)
      }
    }
  })
})

/**
 *
 */
const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This is a post the we can share between users',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "The type of post'id"
    },
    comment: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The core content of the post'
    },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId)
      }
    }
  })
})

/**
 *
 */
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Description of a User',
  fields: () => ({
    id: { type: GraphQLID, description: `User's id` },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the user. Can't be null"
    },
    age: {
      type: GraphQLInt,
      description: 'Yes, it is actually the age of te user !'
    },
    profession: { type: new GraphQLNonNull(GraphQLString) },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent) {
        logger.info('Looking for posts for ' + parent.userId)
        return Post.find().where('userId').equals(parent.userId)
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent) {
        logger.info('Looking for hobbies for ' + parent.id)
        return Hobby.find().where('userId').equals(parent.userId)
      }
    }
  })
})

module.exports = { UserType, Person, HobbyType, PostType }
