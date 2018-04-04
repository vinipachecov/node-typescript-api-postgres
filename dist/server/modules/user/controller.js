"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatus = require("http-status");
class UserController {
    constructor() {
    }
    getAll(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'Ok'
        });
    }
    createUser(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'Ok'
        });
    }
    getById(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'Ok'
        });
    }
    updateUser(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'Ok'
        });
    }
    deleteUser(req, res) {
        res.status(HTTPStatus.OK).json({
            message: 'Ok'
        });
    }
}
exports.default = UserController;
