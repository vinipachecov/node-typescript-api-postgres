"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatus = require("http-status");
function authFail(req, res) {
    res.sendStatus(HTTPStatus.UNAUTHORIZED);
}
exports.default = authFail;
