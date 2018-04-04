"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const handlers_1 = require("../../api/responses/handlers");
const service_1 = require("./service");
class UserController {
    constructor() { }
    getAll(req, res) {
        service_1.default
            .getAll()
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, `Erro ao buscar todos os usuários`));
    }
    createUser(req, res) {
        service_1.default
            .create(req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, `Erro ao cadastrar novo usuário`));
    }
    getById(req, res) {
        //get the id from the ?id=15 
        const userId = parseInt(req.params.id);
        service_1.default.getById(userId)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro buscar usuário por ID ', userId));
    }
    updateUser(req, res) {
        const userId = parseInt(req.params.id);
        const props = req.body;
        service_1.default.update(userId, props)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, `Falha ao atualizar usuário`));
    }
    deleteUser(req, res) {
        const userId = parseInt(req.params.id);
        service_1.default.delete(userId)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, `Erro ao excluir usuário`));
    }
}
exports.default = new UserController();
