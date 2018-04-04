"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
const errorHandlerApi_1 = require("./errorHandlerApi");
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
        this.express.use(errorHandlerApi_1.errorHandlerApi);
        this.router(this.express);
    }
    router(app) {
        new routes_1.default(app);
    }
}
exports.default = new Api().express;
