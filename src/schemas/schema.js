const { gql } = require('apollo-server')

export default gql`
  # Your schema will go here
  type Query {
    """
    Retrieve all users
    """
    users: [User]!

    """
    Fetch one user by the id
    """
    user(id: ID!): User

    hobbies: [Hobby]!
    hobby(id: ID!): Hobby
    posts: [Post]!
    post(id: ID!): Post
  }

  type Mutation {
    """
    Delete the given user
    """
    DeleteUser(id: [ID]!): Response!

    """
    Update the given user (age, profession)
    """
    UpdateUser(id: [ID]!, age: Int, profession: String): Response!

    """
    Create a new user
    """
    CreateUser(
      id: [ID]!
      name: String!
      email: String!
      age: Int
      profession: String
    ): Response!
  }

  """
  Response given for mutations
  """
  type Response {
    success: Boolean!
    message: String
  }

  enum Status {
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
  }

  """
  A User is a person, but also a consummer of services with posts and hobbies, email, age and profession
  """
  type User {
    id: ID!

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

    age: Int
    profession: String
    status: Status
    posts: [Post]
    hobbies: [Hobby]
  }

  """
  Something a user like to do
  """
  type Hobby {
    id: ID!
    title: String!
    description: String
    creation: Int
    user: User!
    status: Status!
  }

  """
  Something a user like to share
  """
  type Post {
    id: ID!
    title: String!
    comment: String
    creation: Int
    user: User!
  }
`
