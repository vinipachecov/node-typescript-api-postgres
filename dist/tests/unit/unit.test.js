"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./config/helpers");
const service_1 = require("../../server/modules/user/service");
let id;
const model = require('../../server/models');
const defaultUser = {
    id: 1,
    name: 'vinicius',
    email: 'vinicius@email.com',
    password: '1234'
};
beforeEach((done) => {
    model.User.destroy({
        where: {}
    })
        .then(() => {
        model.User.create(defaultUser).then(() => {
            console.log('Default user criado');
            done();
        });
    });
});
// encapsulate all test inside this one 
// like combining...
describe('Testes Unitários do Controller', () => {
    // 
    describe('Método Create', () => {
        it('Deve criar um novo usuário', () => {
            // logic....
            const novoUsuario = {
                id: 19,
                name: 'novo Usuario',
                email: 'novouser@email.com',
                password: '1234'
            };
            return service_1.default.create(novoUsuario)
                .then(data => {
                helpers_1.expect(data.dataValues).to.have.all.keys(['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']);
            });
        });
    });
    describe('Método Update', () => {
        it('Deve Atualizar um usuário', () => {
            // logic....
            const usuarioAtualizado = {
                name: 'nome atualizado',
                email: 'atualizado@email.com'
            };
            return service_1.default.update(defaultUser.id, usuarioAtualizado).then(data => {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe('Método GET Users', () => {
        it('Deveretornar uma lista com todos os usuários', () => {
            return service_1.default.getAll()
                .then(data => {
                helpers_1.expect(data).to.be.an('array');
            });
        });
    });
    describe('Método GetById', () => {
        it('Deve encontrar um usuário pelo ID', () => {
            return service_1.default.getById(defaultUser.id)
                .then(data => {
                console.log('dados');
                console.log(data);
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método GetByEmail', () => {
        it('Deve encontrar um usuário pelo Email', () => {
            return service_1.default.getByEmail(defaultUser.email)
                .then(data => {
                helpers_1.expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
            });
        });
    });
    describe('Método DELETE Users', () => {
        it('Deve deletar um usuário', () => {
            return service_1.default.delete(defaultUser.id).then(data => {
                helpers_1.expect(data).to.be.equal(defaultUser.id);
            });
        });
    });
});
