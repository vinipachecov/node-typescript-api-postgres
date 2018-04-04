import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import { errorHandlerApi } from './errorHandlerApi';
import AuthConfig from '../auth';



class Api {

  public express: Application;
  public auth;

  constructor() {
    this.express = express();
    this.auth = AuthConfig();
    this.middlware();
  }

  middlware(): void
 {
   //log handler
   this.express.use(morgan('dev'));
   //accept encoded values in the body   
   this.express.use(bodyParser.urlencoded({ extended: true }));
   //accept json data in the body
   this.express.use(bodyParser.json());
   this.express.use(errorHandlerApi);
   
   //send my authentication strategy
   this.express.use(this.auth.initialize());
   
   this.router(this.express, this.auth);
 }

 private router(app: Application, auth: any): void {
   new Routes(app, auth);
 }

}

export default new Api().express;


