const _ = require('lodash')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList
} = require('graphql')

const usersData = require('./users.json')
const hobbyData = require('./hobbies.json')
const postData = require('./posts.json')

/**
 * 
 */
const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'Represents a person type',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
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

/**
 * 
 */
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

module.exports = { UserType, Person, HobbyType, PostType}
