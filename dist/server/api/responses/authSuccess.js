"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
const HTTPStatus = require("http-status");
const bcrypt = require("bcrypt");
const config = require('../../config/env/config')();
function authSuccess(res, credentials, data) {
    //check if credential password is the same of the database password
    const isMatch = bcrypt.compareSync(credentials.password, data.password);
    if (isMatch) {
        const payload = { id: data.id };
        //send the token
        res.json({
            token: jwt.encode(payload, config.secret)
        });
    }
    else {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
}
exports.default = authSuccess;
