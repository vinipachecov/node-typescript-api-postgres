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
  // describe('Método Create', () => {
  //   it('Deve criar um novo usuário', () => {
  //     // logic....
  //     const novoUsuario = {
  //       id: 19,
  //       name: 'novo Usuario',
  //       email: 'novouser@email.com',
  //       password: '1234'
  //     };
  //     const user = new User();      
  //     return user.create(novoUsuario)
  //       .then(data => {
  //          expect(data.dataValues).to.have.all.keys(
  //            ['email', 'id', 'name', 'password','updatedAt', 'createdAt']
  //          );
  //       });
  //   });
  // });

  // describe('Método Update', () => {
  //   it('Deve Atualizar um usuário', () => {
  //     // logic....
  //     const usuarioAtualizado = {
  //       name: 'nome atualizado',
  //       email: 'atualizado@email.com'
  //     };
  //     const user = new User();
  //     return user.update(1, usuarioAtualizado).then(data => {
  //       expect(data[0]).to.be.equal(1);
  //     })
  //   });
  // });

  // describe('Método GET Users', () => {
  //   it('Deveretornar uma lista com todos os usuários', () => {
  //     const user = new User();
  //     return user.getAll()
  //       .then(data => {
  //         expect(data).to.be.an('array');
  //         expect(data[0]).to.have.all.keys(
  //           ['email', 'id', 'name', 'password']
  //         )
  //       })
  //   });
  // });

  // describe('Método GetById', () => {
  //   it('Deve encontrar um usuário pelo ID', () => {
  //     id = 19;
  //     const user = new User();
  //     return user.getById(id)
  //       .then(data => {
  //         expect(data).to.have.all.keys(
  //           ['email', 'id', 'name', 'password']
  //         )
  //       });
  //   })    
  // })

  describe('Método GetByEmail', () => {
    it('Deve encontrar um usuário pelo Email', () => {            
      const user = new User();
      return user.getByEmail(defaultUser.email)
        .then(data => {
          expect(data).to.have.all.keys(
            ['email', 'id', 'name', 'password']
          )
        });
    })    
  })
  

  // describe('Método DELETE Users', () => {
  //   it('Deve deletar um usuário', () => {
  //     const user = new User();
  //     return user.delete(1).then(data => {        
  //       expect(data).to.be.equal(1);
  //     })
  //   });
  // });

  
});