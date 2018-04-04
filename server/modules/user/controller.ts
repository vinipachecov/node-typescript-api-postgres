import * as HTTPStatus from 'http-status';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { onError } from '../../api/responses/errorHandler';
import { onSuccess } from '../../api/responses/successHandler';
import { dbErrorHandler } from '../../config/dbErrorHandler';
import User from './service';

class UserController {

  private UserService: User;  

  constructor() {
    this.UserService = new User();
  }

  getAll(req: Request, res: Response) {
    this.UserService
      .getAll()
      .then(_.partial(onSuccess, res))                      
      .catch(_.partial(onError, res, `Erro ao buscar todos os usuários`))  ;
  }

   createUser(req: Request, res: Response) {
     this.UserService
      .create(req.body)
      .then(_.partial(onSuccess, res))    
      .catch(_.partial(dbErrorHandler, res))
      .catch(_.partial(onError, res,  `Erro ao cadastrar novo usuário`));          
  }

  getById(req: Request, res: Response) {
    //get the id from the ?id=15 
    const userId = parseInt(req.params.id);
    this.UserService.getById(userId)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Erro buscar usuário por ID ', userId));    
  }

  updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const props = req.body;
    this.UserService.update(userId, props)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, `Falha ao atualizar usuário`));    
  }

  deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    this.UserService.delete(userId)
    .then(_.partial(onSuccess, res))
    .catch(_.partial(onError, res, `Erro ao excluir usuário`));
  }
}

export default UserController;