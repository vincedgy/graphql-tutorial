GraphQL with nodeJS and express
---------------------------------

Author  : Vincent DAGOURY
Date    : 2019/10



## Prerequisites

- Node JS 10+ with npm
- Visual Studio Code and usefull extensions

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
    name
    profession
    id
    hobbies {
      title
    }
    posts {
      comment
    }
  },CreatePost(comment: "Yeah", userId: 1) {
    comment
    user {
      name
    }
  },CreateHobby(title: "What an hobby !", userId: 1) {
    title
    user {
      name
    }
  }
}
```


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
  CreatePost(comment: "Yeah") {
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