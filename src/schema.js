const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar DATE_TIME

  # Your schema will go here
  type Query {
    users: [User]!
    user(id: ID!): User
    hobbies: [Hobby]!
    hobby(id: ID!): Hobby
    posts: [Post]!
    post(id: ID!): Post
    persons: [Person]!
    person(id: ID!): Person
  }

  type Mutation {
    DeleteUser(id: [ID]!): Response!
    UpdateUser(id: [ID]!, name: String, verified: Boolean): Response!
    CreateUser(name: String!, email: String!, verified: Boolean): Response!

    DeletePerson(id: [ID]!): Response!
    UpdatePerson(
      id: [ID]!
      firstName: String
      lastName: String
      isMarried: Boolean
      age: Int
      profession: String
      userId: ID
    ): Response!
    CreatePerson(
      firstName: String!
      lastName: String!
      email: String!
      isMarried: Boolean
      age: Int
      profession: String
      userId: ID
    ): Response!

    DeleteHobby(id: [ID]!): Response!
    UpdateHobby(
      id: [ID]!
      title: String
      description: String
      status: Status
    ): Response!
    CreateHobby(
      userId: ID!
      title: String!
      description: String
      status: Status
    ): Response!

    DeletePost(id: [ID]!): Response!
    UpdatePost(id: [ID]!, title: String, comment: String): Response!
    CreatePost(userId: ID!, title: String!, comment: String!): Response!
  }

  """
  Response given for mutations
  """
  type Response {
    success: Boolean!
    message: String
  }

  enum Status {
    UNDEFINED
    ACTIVE
    INACTIVE
  }

  # My schema now...

  """
  A person with first and last names
  """
  type Person {
    id: ID!
    firstName: String
    lastName: String
    isMarried: Boolean
    age: Int
    profession: String
    user: User
    creation: DATE_TIME
  }

  """
  A User is a person, but also a consummer of services with posts and hobbies, email, age and profession
  """
  type User {
    id: ID!

    creation: DATE_TIME

    """
    A user is linked to a Person (GDPR), or not.
    """
    person: Person

    """
    The casual name of the user. The user use the login to authentication, not the name
    """
    name: String!

    """
    Email is very important since it allow the system to authenticate the User
    """
    email: String!

    """
    Email verification garanties the User's email ownership
    """
    verified: Boolean

    """
    Posts of the user
    """
    posts: [Post]

    """
    Hobbies of the user
    """
    hobbies: [Hobby]
  }

  """
  Something a user like to do
  """
  type Hobby {
    id: ID!
    creation: DATE_TIME
    user: User!
    title: String!
    description: String
    status: Status
  }

  """
  Something a user like to share
  """
  type Post {
    id: ID!
    creation: DATE_TIME
    user: User!
    title: String!
    comment: String
  }
`
export default typeDefs
