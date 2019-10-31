GraphQL with nodeJS and express
---------------------------------

Author  : Vincent DAGOURY
Date    : 2019/10

## Prerequisites

- Node JS 10+ with npm
- Visual Studio Code and usefull extensions
- MongoDB Atlas account, a cluster and a user to connect with
- eslint globally installed
- webpack-cli globally installed

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

## Same with MongoDB in the backend

```graphql

# Create some Documents
mutation {
  CreateUser(name:"Maykel", age:36, profession: "Developper") { id }
}

#mutation {
#  CreatePost(comment: "This is a comment") {id}
#}

#mutation {
#  CreateHobby(title: "This is a hobby") {id}
#}
```


```graphql
query {

  # Query all users from MongoDB
  users {
    id
    name
    profession
  }
  user(id: "5db9cbda1c55056c54db3c7f") {id}

  # Query all hobbies from MongoDB
  hobbies {
    id
    title
    description
  }
  hobby(id: "5db9c730142c9c6896ad39ae") {id}

  # Query all post from MongoDB
  posts {
    id
    comment
  }
  post(id: "5db9c707142c9c6896ad39ad") {id}

 }
```

etc...
