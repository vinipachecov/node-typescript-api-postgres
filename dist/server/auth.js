"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const service_1 = require("./modules/user/service");
const config = require('./config/env/config')();
function authConfig() {
    const userService = new service_1.default();
    let opts = {
        secretOrKey: config.secret,
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('JWT')
    };
    passport.use(new passport_jwt_1.Strategy(opts, (jwtPayload, done) => {
        userService.getById(jwtPayload.id)
            .then(user => {
            if (user) {
                return done(null, {
                    id: user.id,
                    email: user.email
                });
            }
            return done(null, false);
        })
            .catch(error => {
            done(error, null);
        });
    }));
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate('jwt', { session: false });
        }
    };
}
exports.default = authConfig;
