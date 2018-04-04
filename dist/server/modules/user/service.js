"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./interface");
const model = require('../../models');
class User {
    constructor() {
    }
    create(user) {
        return model.User.create(user);
    }
    getAll() {
        return model.User.findAll({
            order: ['name']
        })
            .then(interface_1.createUsers);
    }
    getById(id) {
        return model.User.findOne({
            where: { id }
        })
            .then(interface_1.createUserById);
    }
    getByEmail(email) {
        return model.User.findOne({
            where: { email }
        })
            .then(interface_1.createUserByEmail);
    }
    update(id, user) {
        return model.User.update(user, {
            where: { id },
            fields: ['name', 'email', 'password'],
            hooks: true,
            individualHooks: true
        });
    }
    delete(id) {
        return model.User.destroy({
            where: { id }
        });
    }
}
exports.default = User;
