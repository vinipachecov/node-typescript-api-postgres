"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
const errorHandlerApi_1 = require("./errorHandlerApi");
const auth_1 = require("../auth");
class Api {
    constructor() {
        this.express = express();
        this.auth = auth_1.default();
        this.middlware();
    }
    middlware() {
        //log handler
        this.express.use(morgan('dev'));
        //accept encoded values in the body   
        this.express.use(bodyParser.urlencoded({ extended: true }));
        //accept json data in the body
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi_1.errorHandlerApi);
        //send my authentication strategy
        this.express.use(this.auth.initialize());
        this.router(this.express, this.auth);
    }
    router(app, auth) {
        new routes_1.default(app, auth);
    }
}
exports.default = new Api().express;
