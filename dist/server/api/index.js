"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
const handlers_1 = require("./responses/handlers");
const auth_1 = require("../auth");
class Api {
    constructor() {
        this.express = express();
        this.middlware();
    }
    middlware() {
        //log handler
        this.express.use(morgan('dev'));
        //accept encoded values in the body   
        this.express.use(bodyParser.urlencoded({ extended: true }));
        //accept json data in the body
        this.express.use(bodyParser.json());
        this.express.use(handlers_1.default.errorHandlerApi);
        //send my authentication strategy
        this.express.use(auth_1.default.config().initialize());
        this.router(this.express, auth_1.default);
    }
    router(app, auth) {
        routes_1.default.initRoutes(app, auth);
    }
}
exports.default = new Api().express;
