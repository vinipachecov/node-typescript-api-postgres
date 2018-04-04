"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../../modules/user/routes");
const auth_1 = require("../../modules/auth/auth");
class Routes {
    constructor(app, auth) {
        this.router = new routes_1.default();
        this.tokenRoute = new auth_1.default();
        this.auth = auth;
        this.getRoutes(app);
    }
    getRoutes(app) {
        app.route('/api/users/all').all(this.auth.authenticate()).get(this.router.index);
        app.route('/api/users/create').all(this.auth.authenticate()).post(this.router.create);
        app.route('/api/users/:id').all(this.auth.authenticate()).get(this.router.findOne);
        app.route('/api/users/:id/update').all(this.auth.authenticate()).put(this.router.update);
        app.route('/api/users/:id/destroy').all(this.auth.authenticate()).delete(this.router.destroy);
        //JWT
        app.route('/token').post(this.tokenRoute.auth);
    }
}
exports.default = Routes;
