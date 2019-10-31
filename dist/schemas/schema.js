"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _loggy=_interopRequireDefault(require("loggy")),_graphql=require("graphql"),_types_schemas=require("./types_schemas"),_User=_interopRequireDefault(require("../model/User")),_Post=_interopRequireDefault(require("../model/Post")),_Hobby=_interopRequireDefault(require("../model/Hobby"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}















// RootQuery
var RootQuery=new _graphql.GraphQLObjectType({
name:"RootQueryType",
description:"The root query",
fields:{
user:{
type:_types_schemas.UserType,
args:{
id:{type:_graphql.GraphQLID}},

resolve:function resolve(a,b){
return _User["default"].findById(b.id);
}},

hobby:{
type:_types_schemas.HobbyType,
args:{
id:{type:_graphql.GraphQLID}},

resolve:function resolve(a,b){
return _Hobby["default"].findById(b.id);
}},

post:{
type:_types_schemas.PostType,
args:{
id:{type:_graphql.GraphQLID}},

resolve:function resolve(a,b){
return _Post["default"].findById(b.id);
}},

users:{
type:new _graphql.GraphQLList(_types_schemas.UserType),
resolve:function resolve(){

return _loggy["default"].info("Looking for users"),_User["default"].find();
}},

posts:{
type:new _graphql.GraphQLList(_types_schemas.PostType),
resolve:function resolve(){

return _loggy["default"].info("Looking for posts"),_Post["default"].find();
}},

hobbies:{
type:new _graphql.GraphQLList(_types_schemas.HobbyType),
resolve:function resolve(){

return _loggy["default"].info("Looking for hobbies"),_Hobby["default"].find();
}}}}),





Mutation=new _graphql.GraphQLObjectType({
name:"Mutation",
fields:{
CreateUser:{
type:_types_schemas.UserType,
args:{
name:{type:_graphql.GraphQLString},
age:{type:_graphql.GraphQLInt},
profession:{type:_graphql.GraphQLString}},

resolve:function resolve(a,b){
var c=new _User["default"](_objectSpread({},b));




return c.save().then(function(){return _loggy["default"].log("Created")})["catch"](function(a){return _loggy["default"].error(a)}),c;
}},

CreatePost:{
type:_types_schemas.PostType,
args:{
comment:{type:_graphql.GraphQLString},
userId:{type:_graphql.GraphQLID}},

resolve:function resolve(a,b){
_loggy["default"].log("Post created");
var c=new _Post["default"](_objectSpread({},b,{creation:new Date}));




return c.save().then(function(b){return _loggy["default"].log(b)})["catch"](function(a){return _loggy["default"].error(a)}),c;
}},

CreateHobby:{
type:_types_schemas.HobbyType,
args:{
title:{type:_graphql.GraphQLString},
description:{type:_graphql.GraphQLString},
userId:{type:_graphql.GraphQLID}},

resolve:function resolve(a,b){
_loggy["default"].log("Hobby created");
var c=new _Hobby["default"](_objectSpread({},b));




return c.save().then(function(){return _loggy["default"].log("Created")})["catch"](function(a){return _loggy["default"].error(a)}),c;
}}}}),_default=




new _graphql.GraphQLSchema({
query:RootQuery,
mutation:Mutation});// Mutations
exports["default"]=_default;
//# sourceMappingURL=schema.js.map