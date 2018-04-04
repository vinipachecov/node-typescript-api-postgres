import { Response, Request } from 'express';
import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import * as bcrypt from 'bcrypt';
const config = require('../../config/env/config')();

export default function authSuccess(res: Response, credentials: any, data: any) {
  //check if credential password is the same of the database password
  const isMatch = bcrypt.compareSync(credentials.password, data.password);

  if (isMatch) {
    const payload = { id: data.id };
    //send the token
    res.json({
      token: jwt.encode(payload, config.secret)
    });
  } else {
    res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }
}
