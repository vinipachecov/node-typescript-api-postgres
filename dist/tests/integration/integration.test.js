"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
const HTTPStatus = require("http-status");
const helpers_1 = require("./config/helpers");
describe('Testes de Integração', () => {
    'use strict';
    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');
    // auxiliary test variables
    let id;
    let token;
    const userTest = {
        id: 100,
        name: 'maria',
        email: 'maria@email.com',
        password: 'teste'
    };
    const userDefault = {
        id: 1,
        name: 'Default User',
        email: 'default@email.com',
        password: 'default'
    };
    // before each test
    // delete all users
    // create both default user and testUser
    beforeEach((done => {
        model.User.destroy({
            where: {}
        })
            .then(() => {
            return model.User.create(userDefault);
        })
            .then((user) => {
            return model.User.create(userTest)
                .then(() => {
                token = jwt.encode({ id: user.id }, config.secret);
                done();
            });
        });
    }));
    describe('POST /token', () => {
        it('Deve receber um JWT', done => {
            const credentials = {
                email: userDefault.email,
                password: userDefault.password
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credentials)
                .end((error, res) => {
                console.log(credentials, res.body.token);
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.token).to.equal(token);
                done(error);
            });
        });
        it('Não deve gerar token', done => {
            const credentials = {
                email: 'email@umemailfalso.com',
                password: 'anypassword'
            };
            helpers_1.request(helpers_1.app)
                .post('/token')
                .send(credentials)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                helpers_1.expect(res.body).to.empty;
                done(error);
            });
        });
    });
    describe('GET /api/users/all', () => {
        it('Deve retornar um array com todos os usuários', done => {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', () => {
        it('Deve retornar apenas um usuário', done => {
            helpers_1.request(helpers_1.app)
                .get(`/api/users/${userDefault.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equal(userDefault.id);
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'id', 'name', 'email', 'password'
                ]);
                id = res.body.payload.id;
                done(error);
            });
        });
    });
    describe('POST /api/users/create', () => {
        it('Deve criar um novo usuário', done => {
            const user = {
                id: 2,
                name: 'Usuario Teste',
                email: 'usuario@gmail.com',
                password: 'novouser'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .send(user)
                .end((error, res) => {
                console.log(res.body.payload);
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.be.eql(user.id);
                helpers_1.expect(res.body.payload.name).to.be.eql(user.name);
                helpers_1.expect(res.body.payload.email).to.be.eql(user.email);
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', () => {
        it('Deve atualizar um usuário', done => {
            const user = {
                name: 'TesteUpdate',
                email: 'update@email.com'
            };
            helpers_1.request(helpers_1.app)
                .put(`/api/users/${1}/update`)
                .send(user)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload[1][0].name).to.be.eql(user.name);
                helpers_1.expect(res.body.payload[1][0].email).to.be.eql(user.email);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', () => {
        it('Deve deletar um usuário', done => {
            helpers_1.request(helpers_1.app)
                .delete(`/api/users/${userTest.id}/destroy`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
                .end((error, res) => {
                console.log(res.body.payload);
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.eql(1);
                done(error);
            });
        });
    });
});
