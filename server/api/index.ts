import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import Handlers from './responses/handlers';
import Auth from '../auth';



class Api {

  public express: Application;  

  constructor() {
    this.express = express();    
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
   this.express.use(Handlers.errorHandlerApi);
   
   //send my authentication strategy
   this.express.use(Auth.config().initialize());
   
   this.router(this.express, Auth);
 }

 private router(app: Application, auth: any): void {
   Routes.initRoutes(app, auth);
 }

}

export default new Api().express;


