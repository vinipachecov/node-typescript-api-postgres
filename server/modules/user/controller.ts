import * as HTTPStatus from 'http-status';
import { Request, Response } from 'express';
import User from './service';

class UserController {

  private UserService: User;  

  constructor() {
    this.UserService = new User();
  }

  getAll(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    });
  }

   createUser(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    });
  }

  getById(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    });
  }

  updateUser(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    });
  }

  deleteUser(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'Ok'
    });
  }
}

export default UserController;