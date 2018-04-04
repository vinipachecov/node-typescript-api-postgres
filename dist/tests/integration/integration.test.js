"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatus = require("http-status");
const helpers_1 = require("./config/helpers");
describe('Testes de Integração', () => {
    describe('GET /api/users/all', () => {
        it('Deve retornar um JSON com todos os usuários', done => {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', () => {
        it('Deve retornar apenas um usuário', done => {
            helpers_1.request(helpers_1.app)
                .get(`/api/users/${1}`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            });
        });
    });
    describe('POST /api/users/create', () => {
        it('Deve criar um novo usuário', done => {
            const user = {
                nome: 'teste'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .send(user)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', () => {
        it('Deve atualizar um usuário', done => {
            const user = {
                nome: 'testeUpdate'
            };
            helpers_1.request(helpers_1.app)
                .put(`/api/users/${1}/update`)
                .send(user)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', () => {
        it('Deve deletar um usuário', done => {
            helpers_1.request(helpers_1.app)
                .delete(`/api/users/${1}/destroy`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                done(error);
            });
        });
    });
});
