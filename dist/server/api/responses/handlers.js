"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatus = require("http-status");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");
const config = require('../../config/env/config')();
/**
 * Response Handlers
 */
class Handlers {
    constructor() { }
    authFail(req, res) {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
    authSuccess(res, credentials, data) {
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
    onError(res, message, err) {
        console.log(`Error: ${err}`);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    }
    onSuccess(res, data) {
        res.status(HTTPStatus.OK).json({ payload: data });
    }
    errorHandlerApi(err, req, res, next) {
        console.error(`API error handler foi executado ${err}`);
        res.status(500).json({
            errorCode: 'ERR-001',
            message: 'Erro Interno do Servidor'
        });
    }
    dbErrorHandler(res, err) {
        console.log(`Error: ${err}`);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-01',
            message: 'Erro ao criar um usuário'
        });
    }
}
;
exports.default = new Handlers();
