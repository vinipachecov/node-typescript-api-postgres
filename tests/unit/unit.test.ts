import { testDouble, expect }  from './config/helpers';
import User from '../../server/modules/user/service';
let id;

const model = require('../../server/models');


const defaultUser  = {
  id: 1,
  name: 'vinicius',
  email: 'vinicius@email.com',
  password: '1234'
}

beforeEach((done)=>{
  model.User.destroy({
    where:{}
  })
  .then(()=>{
    model.User.create(defaultUser).then(()=>{
      console.log('Default user criado');
      done();
    })
  })
})


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
      return User.create(novoUsuario)
        .then(data => {
           expect(data.dataValues).to.have.all.keys(
             ['email', 'id', 'name', 'password','updatedAt', 'createdAt']
           );
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
      return User.update(defaultUser.id, usuarioAtualizado).then(data => {
        expect(data[0]).to.be.equal(1);
      })
    });
  });

  describe('Método GET Users', () => {
    it('Deveretornar uma lista com todos os usuários', () => {
      
      return User.getAll()
        .then(data => {
          expect(data).to.be.an('array');          
        })
    });
  });

  describe('Método GetById', () => {
    it('Deve encontrar um usuário pelo ID', () => {      
      return User.getById(defaultUser.id)
        .then(data => {
          console.log('dados');
          console.log(data);
          expect(data).to.have.all.keys(
            ['email', 'id', 'name', 'password']
          )
        });
    })    
  })

  describe('Método GetByEmail', () => {
    it('Deve encontrar um usuário pelo Email', () => {                  
      return User.getByEmail(defaultUser.email)
        .then(data => {
          expect(data).to.have.all.keys(
            ['email', 'id', 'name', 'password']
          )
        });
    })    
  })
  

  describe('Método DELETE Users', () => {
    it('Deve deletar um usuário', () => {  
      return User.delete(defaultUser.id).then(data => {        
        expect(data).to.be.equal(defaultUser.id);
      })
    });
  });

  
});