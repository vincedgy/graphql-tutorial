![](https://github.com/vincedgy/graphql-tutorial/workflows/Node%20CI/badge.svg)

GraphQL with nodeJS and express
-------------------------------

>
  - Author : Vincent DAGOURY
  - Date : 2019/10
  - License : ISC [https://www.gnu.org/licenses/license-list.html#ISC](https://www.gnu.org/licenses/license-list.html#ISC)


## Table of Contents

1. [Project objectives](#Project-objectives)
2. [Prerequisites](#Prerequisites)
3. [Dependencies](#Dependencies)
4. [Installation](#Installation)
5. [Setting configs](#Setting-configs)
6. [Running the app](#Running-the-app)
7. [Develop the app](#Develop-the-app)
8. [Debugging the app](#Debugging-the-app)
9. [Build the app](#Build-the-app)
10. [GraphQL Queries](#GraphQL-Queries)
11. [Using Docker](#Using-Docker)
12. [Using heroku](#Using-Heroku)
13. [Using Apollo](#Using-Apollo)

## Project objectives

- Learn GraphQL with Node.js written in ES6
- Go in depth with Babel (for ES6 compilation) and Webpack (for packaging)
- Using ESLint, Prettier, Nodemon and others dev tools
- Debugging within vscode
- Using a Cloud Backend like MongoDB Atlas
- Using a Docker container at this end
- Use Heroku and deploy the server to the World
- Use Apollo as the number one framework for our GraphQL server

## Prerequisites

- Node JS 10+ with npm
- Visual Studio Code and usefull extensions
- MongoDB Atlas account, a cluster and a user to connect with
- eslint globally installed
- webpack-cli globally installed
- heroku-cli (if you have an account)

## Dependencies

- NodeJs : [https://nodejs.org/en/](https://nodejs.org/en/)
- GraphQL : [https://graphql.org/](https://graphql.org/)
- Express : [https://expressjs.com/](https://expressjs.com/)
- Babel : [https://babeljs.io/](https://babeljs.io/)
- Webpack : [https://webpack.js.org/](https://webpack.js.org/)
- MongoDB Atlas : [https://cloud.mongodb.com](https://cloud.mongodb.com)
- Mongoose : [https://mongoosejs.com/](https://mongoosejs.com/)
- Heroku : [https://dashboard.heroku.com/apps](https://dashboard.heroku.com/apps)
- Apollo : [https://www.apollographql.com/docs/](https://www.apollographql.com/docs/)

### But also

- Visual Studio Code : [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Docker : [https://www.docker.com/](https://www.docker.com/)

## Installation

package.json contains depencies for this app and ```npm install``` will install them.

```shell
npm ci
```

## Setting configs

The app use ```dotenv```. You'll need to create a .env file with the following vars and with the proper values !

```shell
MONGODB_PASSWORD=whatever
MONGODB_PASSWORD=yoursecret
MONGODB_HOST=yourhost
MONGODB_NAME=yourdbname
```

## Running the app

This command will launch installation of depencies, build and start the server

```shell
$ npm ci
$ npm run build
$ npm run start
```

## Develop the app

Executing server during dev

```shell
$ npm run serve
```

## Debugging the app

Executing server in watch mode while debugging with vscode with 'Debug' config of .vscode/launch.json

```shell
$ npm run watch


> graphql-tutorial@2.0.0 watch /Users/vincent/Projects/GraphQL/graphql-tutorial
> babel src --out-dir dist --source-maps --watch --verbose

src/index.js -> dist/index.js
src/model/Hobby.js -> dist/model/Hobby.js
src/model/Post.js -> dist/model/Post.js
src/model/User.js -> dist/model/User.js
src/mongo.js -> dist/mongo.js
src/schemas/schema.js -> dist/schemas/schema.js
src/schemas/types_schemas.js -> dist/schemas/types_schemas.js
Successfully compiled 7 files with Babel.

```

Now you can pu breakpoints and checkout variables within Visual Studio Code

## Build the app

Build the webpack bundle, will create a 'bundle.js' file within 'dist-prod' directory.

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

Now you can launch yourself the production build

```shell
$ node ./build/bundle.js
```

# GraphQL Queries

You'll be able to query with the help of integrated GraphiQL at [http://localhost:4000/graphql](http://localhost:4000/graphql)

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

### Querying all users

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

### Same with MongoDB in the backend

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

----

# Using Docker

Now let's build our GraphQL as a Docker container !

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

----


# Using heroku

Assuming you have an account on heroku and you know its capabilites to push apps [https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)...

```shell
heroku create
Creating app... !
 ▸    Invalid credentials provided.
Enter your Heroku credentials:
Email: vincent.dagoury@gmail.com
Password: **************
Creating app... done, ⬢ spooky-cat-34882
https://spooky-cat-34882.herokuapp.com/ | https://git.heroku.com/spooky-cat-34882.git


$ git remote -v
heroku	https://git.heroku.com/spooky-cat-34882.git (fetch)
heroku	https://git.heroku.com/spooky-cat-34882.git (push)
origin	git@github.com:vincedgy/graphql-tutorial.git (fetch)
origin	git@github.com:vincedgy/graphql-tutorial.git (push)

```

### Adding config in Heroku

You need to set all the vars needed (locally in a .env file for your dev)

```shell
heroku config:set MONGODB_PASSWORD=vincent MONGODB_PASSWORD=12345 MONGODB_HOST=cluster-1-p0lig.mongodb.net MONGODB_NAME=test
```

### Deploy the app

```shell
$ git push heroku master

Enumerating objects: 245, done.
Counting objects: 100% (245/245), done.
Delta compression using up to 4 threads
Compressing objects: 100% (177/177), done.
Writing objects: 100% (245/245), 139.92 KiB | 4.00 MiB/s, done.
Total 245 (delta 125), reused 98 (delta 58)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:        NODE_VERBOSE=false
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:
remote:        Resolving node version 12.x...
remote:        Downloading and installing node 12.13.0...
remote:        Using default npm version: 6.12.0
remote:
remote: -----> Installing dependencies
remote:        Installing node modules (package.json + package-lock)
remote:
remote:        > core-js@3.3.5 postinstall /tmp/build_23e10da2ef638f8e20a77f4d1b8edb3d/node_modules/core-js
remote:        > node postinstall || echo "ignore"
remote:
remote:
remote:        > nodemon@1.19.4 postinstall /tmp/build_23e10da2ef638f8e20a77f4d1b8edb3d/node_modules/nodemon
remote:        > node bin/postinstall || exit 0
remote:
remote:        Love nodemon? You can now support the project via the open collective:
remote:         > https://opencollective.com/nodemon/donate
remote:
remote:        added 798 packages from 417 contributors and audited 11763 packages in 21.112s
remote:        found 0 vulnerabilities
remote:
remote:
remote: -----> Build
remote:        Running build
remote:
remote:        > graphql-tutorial@2.0.0 build /tmp/build_23e10da2ef638f8e20a77f4d1b8edb3d
remote:        > webpack --config ./webpack.config.js --mode production
remote:
remote:        Hash: 25d0a0e4b63ae4745c89
remote:        Version: webpack 4.41.2
remote:        Time: 2357ms
remote:        Built at: 10/31/2019 3:04:00 PM
remote:            Asset     Size  Chunks             Chunk Names
remote:        bundle.js  9.2 KiB       0  [emitted]  main
remote:        Entrypoint main = bundle.js
remote:        [0] external "graphql" 42 bytes {0} [built]
remote:        [1] external "loggy" 42 bytes {0} [built]
remote:        [2] external "mongoose" 42 bytes {0} [built]
remote:        [3] external "graphql-iso-date" 42 bytes {0} [built]
remote:        [4] external "dotenv/config" 42 bytes {0} [built]
remote:        [5] external "express" 42 bytes {0} [built]
remote:        [6] external "cors" 42 bytes {0} [built]
remote:        [7] external "express-graphql" 42 bytes {0} [built]
remote:        [8] ./src/index.js + 6 modules 14.5 KiB {0} [built]
remote:            | ./src/index.js 1.57 KiB [built]
remote:            | ./src/mongo.js 748 bytes [built]
remote:            | ./src/schemas/schema.js 8.48 KiB [built]
remote:            | ./src/model/User.js 149 bytes [built]
remote:            | ./src/model/Post.js 151 bytes [built]
remote:            | ./src/model/Hobby.js 173 bytes [built]
remote:            | ./src/schemas/types_schemas.js 3.17 KiB [built]
remote:
remote: -----> Pruning devDependencies
remote:        removed 714 packages and audited 187 packages in 8.492s
remote:        found 0 vulnerabilities
remote:
remote:
remote: -----> Caching build
remote:        - node_modules
remote:
remote: -----> Build succeeded!
remote:  !     This app may not specify any way to start a node process
remote:        https://devcenter.heroku.com/articles/nodejs-support#default-web-process-type
remote:
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 23.5M
remote: -----> Launching...
remote:        Released v3
remote:        https://spooky-cat-34882.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/spooky-cat-34882.git
 * [new branch]      master -> master

```

### Watch Heroku logs

```shell
$ heroku logs --tail
```

# Using Apollo

Now that everything is working, let's play with the number ONE framework for GraphQL : [Apollo](https://www.apolUsinglographql.com/)

A complete framework and a platform, with a very accomplished user experience, schema definition using a DSL (gql), many implemntation in many languages, Chrome extensions etc.

The main goal of Apollo is to give a `declarative data fetching` platform.

And it uses [GraphQL Playground](GraphQL Playground), way more better than GraphiQL...

It's a whole refactoring process, Of Course, but the multiple [benefits](https://www.apollographql.com/docs/intro/benefits/) of Apollo platform worst it.

You'll use [Apollo Engine](https://engine.apollographql.com/login) and read a lot of [documentation](https://www.apollographql.com/docs/) but the Apollo experience on both sides is totally game changing.

Create your Apollo Engine account (using Github Auth), it's free !

## Dependencies

Local and global dependencies are needed in order to user Apollo plateform.

And first you will use Apollo platform and service to publish your schema, serving you with a lot of toolings using [Apollo Engine](https://engine.apollographql.com/login).


```shell
npm install --global apollo
```

Now the local dependencies :

- [apollo-server](https://www.npmjs.com/package/apollo-server)
- [apollo-tools](https://www.npmjs.com/package/@apollographql/apollo-tools)

```shell
npm install --save apollo-server apollo-tools
```
