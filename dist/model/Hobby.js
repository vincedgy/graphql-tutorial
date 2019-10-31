"use strict";var _mongoose=_interopRequireDefault(require("mongoose"));Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var _default=

_mongoose["default"].model("Hobby",new _mongoose["default"].Schema({
title:String,
description:String,
userId:String}));exports["default"]=_default;
//# sourceMappingURL=Hobby.js.map