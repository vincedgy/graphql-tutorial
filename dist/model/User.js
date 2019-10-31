"use strict";var _mongoose=_interopRequireDefault(require("mongoose"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var _default=

_mongoose["default"].model("User",new _mongoose["default"].Schema({
name:String,
age:Number,
profession:String}));exports["default"]=_default;
//# sourceMappingURL=User.js.map