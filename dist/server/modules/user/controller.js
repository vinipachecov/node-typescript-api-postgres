"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const errorHandler_1 = require("../../api/responses/errorHandler");
const successHandler_1 = require("../../api/responses/successHandler");
const dbErrorHandler_1 = require("../../config/dbErrorHandler");
const service_1 = require("./service");
class UserController {
    constructor() {
        this.UserService = new service_1.default();
    }
    getAll(req, res) {
        this.UserService
            .getAll()
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, `Erro ao buscar todos os usuários`));
    }
    createUser(req, res) {
        this.UserService
            .create(req.body)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(dbErrorHandler_1.dbErrorHandler, res))
            .catch(_.partial(errorHandler_1.onError, res, `Erro ao cadastrar novo usuário`));
    }
    getById(req, res) {
        //get the id from the ?id=15 
        const userId = parseInt(req.params.id);
        this.UserService.getById(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Erro buscar usuário por ID ', userId));
    }
    updateUser(req, res) {
        const userId = parseInt(req.params.id);
        const props = req.body;
        this.UserService.update(userId, props)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, `Falha ao atualizar usuário`));
    }
    deleteUser(req, res) {
        const userId = parseInt(req.params.id);
        this.UserService.delete(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, `Erro ao excluir usuário`));
    }
}
exports.default = UserController;
