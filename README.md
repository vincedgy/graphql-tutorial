![](https://github.com/vincedgy/graphql-tutorial/workflows/Node%20CI/badge.svg)

## GraphQL with nodeJS and express

- Author : Vincent DAGOURY
- Date : 2019/10
- License : ISC [https://www.gnu.org/licenses/license-list.html#ISC](https://www.gnu.org/licenses/license-list.html#ISC)

## Objectives

- Learn GraphQL with Node.js written in ES6
- Go in depth with Babel (for ES6 compilation) and Webpack (for packaging)
- Using ESLint, Prettier, Nodemon and others dev tools
- Debugging within vscode
- Using a Cloud Backend like MongoDB Atlas
- Using a Docker container at this end

## Prerequisites

- Node JS 10+ with npm
- Visual Studio Code and usefull extensions
- MongoDB Atlas account, a cluster and a user to connect with
- eslint globally installed
- webpack-cli globally installed

## Main dependencies

- NodeJs : [https://nodejs.org/en/](https://nodejs.org/en/)
- GraphQL : [https://graphql.org/](https://graphql.org/)
- Express : [https://expressjs.com/](https://expressjs.com/)
- Babel : [https://babeljs.io/](https://babeljs.io/)
- Webpack : [https://webpack.js.org/](https://webpack.js.org/)
- MongoDB Atlas : [https://cloud.mongodb.com](https://cloud.mongodb.com)
- Mongoose : [https://mongoosejs.com/](https://mongoosejs.com/)


### But also

- Visual Studio Code : [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Docker : [https://www.docker.com/](https://www.docker.com/)


## Install

package.json contains depencies for this app and ```npm install``` will install them.

```
npm i
```

## Development

Executing server during dev

```shell
$ npm run serve
```

## Build

Build the webpack bundle

```shell
$ npm run build

> graphql-tutorial@2.0.0 build /Users/vincent/Projects/GraphQL/graphql-tutorial
> webpack --config ./webpack.config.js --mode production

Hash: 25d0a0e4b63ae4745c89
Version: webpack 4.41.2
Time: 1922ms
Built at: 10/31/2019 3:20:47 PM
    Asset     Size  Chunks             Chunk Names
bundle.js  9.2 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] external "graphql" 42 bytes {0} [built]
[1] external "loggy" 42 bytes {0} [built]
[2] external "mongoose" 42 bytes {0} [built]
[3] external "graphql-iso-date" 42 bytes {0} [built]
[4] external "dotenv/config" 42 bytes {0} [built]
[5] external "express" 42 bytes {0} [built]
[6] external "cors" 42 bytes {0} [built]
[7] external "express-graphql" 42 bytes {0} [built]
[8] ./src/index.js + 6 modules 14.5 KiB {0} [built]
    | ./src/index.js 1.57 KiB [built]
    | ./src/mongo.js 748 bytes [built]
    | ./src/schemas/schema.js 8.48 KiB [built]
    | ./src/model/User.js 149 bytes [built]
    | ./src/model/Post.js 151 bytes [built]
    | ./src/model/Hobby.js 173 bytes [built]
    | ./src/schemas/types_schemas.js 3.17 KiB [built]

```

now you can launch the production build

```shell
$ node ./build/bundle.js
```

## Queries

You should use GraphiQL (http://localhost:4000/graphql)[http://localhost:4000/graphql]

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

You can use ```curl```

```shell
$ curl -s -H "Content-Type: application/json" --data '{ "query" : "{ users { name } }" }' localhost:4000/graphql
{"data":{"users":[{"name":"Vincent DAGOURY"}]}}%
```

combine with ```jq``` for nice presentation

```shell
$ curl -s -H "Content-Type: application/json" --data '{ "query" : "{ users { name } }" }' localhost:4000/graphql | jq '.'
{
  "data": {
    "users": [
      {
        "name": "Vincent DAGOURY"
      }
    ]
  }
}
```

Or using ```httpie``` (wich is my prefered on)

```shell
$ http localhost:4000/graphql query='{ users { name } }'

HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 47
Content-Type: application/json; charset=utf-8
Date: Thu, 31 Oct 2019 14:32:49 GMT
ETag: W/"2f-ard18dEnuNRuoj1e6gSVEcZGtVk"
X-Powered-By: Express

{
    "data": {
        "users": [
            {
                "name": "Vincent DAGOURY"
            }
        ]
    }
}
```



### Mutations

```graphql
mutation {
  CreateUser(name: "John", age: 54, profession: "doctor") {
    id
  }
  CreatePost(comment: "Yeah", userId: 1) {
    id
  }
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
  CreateUser(name: "Maykel", age: 36, profession: "Developper") {
    id
  }
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
  user(id: "5db9cbda1c55056c54db3c7f") {
    id
  }

  # Query all hobbies from MongoDB
  hobbies {
    id
    title
    description
  }
  hobby(id: "5db9c730142c9c6896ad39ae") {
    id
  }

  # Query all post from MongoDB
  posts {
    id
    comment
  }
  post(id: "5db9c707142c9c6896ad39ad") {
    id
  }
}
```

## Build and run Docker container

A Dockerfile can build the containerized version of this app.

You simply need to launch the building of the container.

```shell
$ docker build . -t graphql-tutorial:latest

Sending build context to Docker daemon  825.9kB
Step 1/8 : FROM node:lts-alpine
 ---> 5d187500daae
Step 2/8 : WORKDIR /usr/src
 ---> Using cache
 ---> 5f7e5c3275eb
Step 3/8 : COPY . .
 ---> 1c779da7ee12
Step 4/8 : RUN npm install
 ---> Running in c70af742c1db

> core-js@3.3.5 postinstall /usr/src/node_modules/core-js
> node postinstall || echo "ignore"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
> https://opencollective.com/core-js
> https://www.patreon.com/zloirock

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


> nodemon@1.19.4 postinstall /usr/src/node_modules/nodemon
> node bin/postinstall || exit 0

Love nodemon? You can now support the project via the open collective:
 > https://opencollective.com/nodemon/donate

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN graphql-tutorial@2.0.0 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 799 packages from 417 contributors and audited 11763 packages in 33.601s
found 0 vulnerabilities

Removing intermediate container c70af742c1db
 ---> 2f735dcd82a1
Step 5/8 : RUN npm run build
 ---> Running in a5c85497f644

> graphql-tutorial@2.0.0 build /usr/src
> webpack --config ./webpack.config.js --mode production

Hash: 25d0a0e4b63ae4745c89
Version: webpack 4.41.2
Time: 2847ms
Built at: 10/31/2019 2:15:23 PM
    Asset     Size  Chunks             Chunk Names
bundle.js  9.2 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] external "graphql" 42 bytes {0} [built]
[1] external "loggy" 42 bytes {0} [built]
[2] external "mongoose" 42 bytes {0} [built]
[3] external "graphql-iso-date" 42 bytes {0} [built]
[4] external "dotenv/config" 42 bytes {0} [built]
[5] external "express" 42 bytes {0} [built]
[6] external "cors" 42 bytes {0} [built]
[7] external "express-graphql" 42 bytes {0} [built]
[8] ./src/index.js + 6 modules 14.5 KiB {0} [built]
    | ./src/index.js 1.57 KiB [built]
    | ./src/mongo.js 748 bytes [built]
    | ./src/schemas/schema.js 8.48 KiB [built]
    | ./src/model/User.js 149 bytes [built]
    | ./src/model/Post.js 151 bytes [built]
    | ./src/model/Hobby.js 173 bytes [built]
    | ./src/schemas/types_schemas.js 3.17 KiB [built]
Removing intermediate container a5c85497f644
 ---> 3a4bf76b9b1a
Step 6/8 : EXPOSE 4000
 ---> Running in 8239a8ecb17d
Removing intermediate container 8239a8ecb17d
 ---> 29186d59b120
Step 7/8 : CMD [ "node", "dist-prod/bundle.js" ]
 ---> Running in d19afef89fcf
Removing intermediate container d19afef89fcf
 ---> 291bfb450823
Step 8/8 : HEALTHCHECK --interval=10s --timeout=2s --start-period=15s   CMD ["node","healthcheck.js"]
 ---> Running in c5bb645d26ee
Removing intermediate container c5bb645d26ee
 ---> 2a48a6ee2f58
Successfully built 2a48a6ee2f58
Successfully tagged graphql-tutorial:latest
```

## Run the Docker container of the app

```shell
$ docker run -it -p 4000:4000 graphql-tutorial:latest

```
