"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0,require("dotenv/config");var _default=

{
user:process.env.MONGODB_USER,
pass:process.env.MONGODB_PASSWORD,
useNewUrlParser:!0,
useUnifiedTopology:!0,
useCreateIndex:!0,
useFindAndModify:!1,
autoIndex:!1,// Don't build indexes
reconnectTries:Number.MAX_VALUE,// Never stop trying to reconnect
reconnectInterval:500,// Reconnect every 500ms
poolSize:10,// Maintain up to 10 socket connections
// If not connected, return errors immediately rather than waiting for reconnect
bufferMaxEntries:0,
connectTimeoutMS:1e4,// Give up initial connection after 10 seconds
socketTimeoutMS:45e3,// Close sockets after 45 seconds of inactivity
family:4// Use IPv4, skip trying IPv6
};exports["default"]=_default;
//# sourceMappingURL=mongo.js.map