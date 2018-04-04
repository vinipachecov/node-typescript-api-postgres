"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
//
class UserRoutes {
    index(req, res) {
        return controller_1.default.getAll(req, res);
    }
    create(req, res) {
        return controller_1.default.createUser(req, res);
    }
    findOne(req, res) {
        return controller_1.default.getById(req, res);
    }
    update(req, res) {
        return controller_1.default.updateUser(req, res);
    }
    destroy(req, res) {
        return controller_1.default.deleteUser(req, res);
    }
}
exports.default = new UserRoutes();
