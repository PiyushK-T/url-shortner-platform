"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRouter = void 0;
const express_1 = require("express");
const url_controller_1 = require("./url.controller");
exports.urlRouter = (0, express_1.Router)();
// protected
exports.urlRouter.post("/", url_controller_1.createUrlHandler);
// public
exports.urlRouter.get("/:code", url_controller_1.redirectHandler);
