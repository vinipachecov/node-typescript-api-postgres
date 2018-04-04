import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import { errorHandlerApi } from './errorHandlerApi';



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
   this.express.use(errorHandlerApi);
   this.router(this.express);
 }

 private router(app: Application): void {
   new Routes(app);
 }

}

export default new Api().express;


