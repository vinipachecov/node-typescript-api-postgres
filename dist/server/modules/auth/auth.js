"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const service_1 = require("../user/service");
const handlers_1 = require("../../api/responses/handlers");
//responsible to answer our token reqs...
class TokenRoutes {
    auth(req, res) {
        const credentials = {
            email: req.body.email,
            password: req.body.password
        };
        if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
            service_1.default.getByEmail(credentials.email)
                .then(_.partial(handlers_1.default.authSuccess, res, credentials))
                .catch(_.partial(handlers_1.default.authFail, req, res));
        }
    }
}
exports.default = new TokenRoutes();
