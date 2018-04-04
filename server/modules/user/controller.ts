import * as HTTPStatus from 'http-status';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import Handlers from '../../api/responses/handlers';
import { dbErrorHandler } from '../../config/dbErrorHandler';
import User from './service';

class UserController {
  
  constructor(){}

  getAll(req: Request, res: Response) {
    User
      .getAll()
      .then(_.partial(Handlers.onSuccess, res))                      
      .catch(_.partial(Handlers.onError, res, `Erro ao buscar todos os usuários`))  ;
  }

   createUser(req: Request, res: Response) {
     User
      .create(req.body)
      .then(_.partial(Handlers.onSuccess, res))    
      .catch(_.partial(Handlers.dbErrorHandler, res))
      .catch(_.partial(Handlers.onError, res,  `Erro ao cadastrar novo usuário`));          
  }

  getById(req: Request, res: Response) {
    //get the id from the ?id=15 
    const userId = parseInt(req.params.id);
    User.getById(userId)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, 'Erro buscar usuário por ID ', userId));    
  }

  updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const props = req.body;
    User.update(userId, props)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, `Falha ao atualizar usuário`));    
  }

  deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    User.delete(userId)
    .then(_.partial(Handlers.onSuccess, res))
    .catch(_.partial(Handlers.onError, res, `Erro ao excluir usuário`));
  }
}

export default new UserController();