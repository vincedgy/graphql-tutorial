GraphQL with nodeJS and express
---------------------------------

Author  : Vincent DAGOURY
Date    : 2019/10

## Prerequisites

- Node JS 10+ with npm
- Visual Studio Code and usefull extensions
- MongoDB Atlas account, a cluster and a user to connect with

## Install

package.json file will install all depenencies

```
npm i
```

## Development

Executing server during dev

```
nodemon app.js
```

## Queries

```graphql
query {
  user(id: 10) {
    name
    profession
    age
    id
    posts {
      id
      comment
    }
    hobbies {
      id
      title
      description
    }
  }
}
```

### Mutations

```graphql
mutation {
  CreateUser(name: "John", age: 54, profession: "doctor") {
    id
  },
  CreatePost(comment: "Yeah", userId: 1) {
    id
  },
  CreateHobby(title: "What an hobby !", userId: 1) {
    id
  }
}
```

### Using mutation and queries combined

```graphql
mutation {
  CreateUser(name: "John", age: 54, profession: "doctor") {
    name
    profession
    id
    hobbies {
      title
    }
    posts {
      comment
    }
  }
  CreatePost(comment: "Yeah", userId: 10) {
    comment
  }
  CreateHobby(title: "My own", description: "What an hobby !", userId: 10) {
    id
    title
    description
    user {
      posts {
        id
        comment
      }
    }
  }
}
```

## Querying all users

```graphql
{
  users {
    id
    name
    profession
    age
    hobbies {
      id
      title
      description
    }
    posts {
      id
      comment
    }
  }
}

```