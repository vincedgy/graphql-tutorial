"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0,require("dotenv/config");var _mongo=_interopRequireDefault(require("./mongo")),_express=_interopRequireDefault(require("express")),_cors=_interopRequireDefault(require("cors")),_loggy=_interopRequireDefault(require("loggy")),_expressGraphql=_interopRequireDefault(require("express-graphql")),_mongoose=_interopRequireDefault(require("mongoose")),_schema=_interopRequireDefault(require("./schemas/schema"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}








var app=(0,_express["default"])();

// Declare app
app.
use((0,_cors["default"])()).
use(
"/graphql",
(0,_expressGraphql["default"])({
graphiql:!0,
schema:_schema["default"]})).


use(function(a,b,c,d){return(
_loggy["default"].error(a.stack),
c.headersSent?
d(a):void(

c.status(500),
c.render("error",{error:a})));
}),

_loggy["default"].info("Starting..."),


_mongoose["default"].
connect(
"mongodb+srv://"+
process.env.MONGODB_HOST+
"/"+
process.env.MONGODB_NAME+
"?retryWrites=true&w=majority",
_mongo["default"])["catch"](

function(a){
_loggy["default"].error("Error during mongoDB connection",a);
}),


_mongoose["default"].connection.on("open",function(){

// Run app
_loggy["default"].log("Now connected to database ".concat(process.env.MONGODB_NAME," on ").concat(process.env.MONGODB_HOST)),app.listen(4e3,function(){
_loggy["default"].info("Server is running on [http://localhost:4000/graphql].");
});
});var _default=

app;exports["default"]=_default;
//# sourceMappingURL=index.js.map