"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
let UserCtrl;
//
class UserRoutes {
    constructor() {
        UserCtrl = new controller_1.default();
    }
    index(req, res) {
        return UserCtrl.getAll(req, res);
    }
    create(req, res) {
        return UserCtrl.createUser(req, res);
    }
    findOne(req, res) {
        return UserCtrl.getById(req, res);
    }
    update(req, res) {
        return UserCtrl.updateUser(req, res);
    }
    destroy(req, res) {
        return UserCtrl.deleteUser(req, res);
    }
}
exports.default = UserRoutes;
