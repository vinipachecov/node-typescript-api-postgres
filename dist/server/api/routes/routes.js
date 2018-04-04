"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../../modules/user/routes");
const auth_1 = require("../../modules/auth/auth");
class Routes {
    constructor() { }
    // rotas da aplicação  
    initRoutes(app, auth) {
        app.route('/api/users/all').all(auth.config().authenticate()).get(routes_1.default.index);
        app.route('/api/users/create').all(auth.config().authenticate()).post(routes_1.default.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(routes_1.default.findOne);
        app.route('/api/users/:id/update').all(auth.config().authenticate()).put(routes_1.default.update);
        app.route('/api/users/:id/destroy').all(auth.config().authenticate()).delete(routes_1.default.destroy);
        //JWT
        app.route('/token').post(auth_1.default.auth);
    }
}
exports.default = new Routes();
