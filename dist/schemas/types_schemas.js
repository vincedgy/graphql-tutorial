"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UserType=exports.PostType=exports.HobbyType=exports.Person=void 0;var _loggy=_interopRequireDefault(require("loggy")),_graphql=require("graphql"),_graphqlIsoDate=require("graphql-iso-date"),_User=_interopRequireDefault(require("../model/User")),_Post=_interopRequireDefault(require("../model/Post")),_Hobby=_interopRequireDefault(require("../model/Hobby"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}


















/**
 *
 */
var Person=new _graphql.GraphQLObjectType({
name:"Person",
description:"Represents a person type",
fields:function fields(){return{
id:{type:_graphql.GraphQLID},
firstName:{type:new _graphql.GraphQLNonNull(_graphql.GraphQLString)},
lastName:{type:_graphql.GraphQLString},
isMarried:{type:_graphql.GraphQLBoolean}}}});



/**
 *
 */exports.Person=Person;
var HobbyType=new _graphql.GraphQLObjectType({
name:"Hobby",
description:"What a pleasure to have a great hobby in life",
fields:function fields(){return{
id:{
type:_graphql.GraphQLID,
description:"The type of the hobby"},

title:{
type:new _graphql.GraphQLNonNull(_graphql.GraphQLString),
description:"The hobby's title"},

description:{
type:_graphql.GraphQLString,
description:"The hobby's description"},

user:{
type:UserType,
resolve:function resolve(a){
return _User["default"].findById(a.userId);
}}}}});




/**
 *
 */exports.HobbyType=HobbyType;
var PostType=new _graphql.GraphQLObjectType({
name:"Post",
description:"This is a post the we can share between users",
fields:function fields(){return{
id:{
type:_graphql.GraphQLID,
description:"The type of post'id"},

comment:{
type:new _graphql.GraphQLNonNull(_graphql.GraphQLString),
description:"The core content of the post"},

creation:{
type:new _graphql.GraphQLNonNull(_graphqlIsoDate.GraphQLDateTime),
description:"The date and time of post creation"},

user:{
type:UserType,
resolve:function resolve(a){
return _User["default"].findById(a.userId);
}}}}});




/**
 *
 */exports.PostType=PostType;
var UserType=new _graphql.GraphQLObjectType({
name:"User",
description:"Description of a User",
fields:function fields(){return{
id:{type:_graphql.GraphQLID,description:"User's id"},
name:{
type:new _graphql.GraphQLNonNull(_graphql.GraphQLString),
description:"The name of the user. Can't be null"},

age:{
type:_graphql.GraphQLInt,
description:"Yes, it is actually the age of te user !"},

profession:{type:new _graphql.GraphQLNonNull(_graphql.GraphQLString)},
posts:{
type:new _graphql.GraphQLList(PostType),
resolve:function resolve(a){

return _loggy["default"].info("Looking for posts for "+a.id),_Post["default"].find().
where("userId").
equals(a.id);
}},

hobbies:{
type:new _graphql.GraphQLList(HobbyType),
resolve:function resolve(a){

return _loggy["default"].info("Looking for hobbies for "+a.id),_Hobby["default"].find().
where("userId").
equals(a.id);
}}}}});exports.UserType=UserType;
//# sourceMappingURL=types_schemas.js.map