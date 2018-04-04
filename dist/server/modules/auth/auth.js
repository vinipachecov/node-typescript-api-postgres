"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const service_1 = require("../user/service");
const authSuccess_1 = require("../../api/responses/authSuccess");
const authFail_1 = require("../../api/responses/authFail");
const userService = new service_1.default();
//responsible to answer our token reqs...
class TokenRoutes {
    auth(req, res) {
        const credentials = {
            email: req.body.email,
            password: req.body.password
        };
        if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
            userService.getByEmail(credentials.email)
                .then(_.partial(authSuccess_1.default, res, credentials))
                .catch(_.partial(authFail_1.default, req, res));
        }
    }
}
exports.default = TokenRoutes;
