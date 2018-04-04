import * as mocha from 'mocha';
import * as chai from 'chai';
import * as td from 'testdouble';

const supertest = require('supertest');
// importar aplicação

import App from '../../../server/api';

const app = App;
const request = supertest;
const expect = chai.expect;
const testDouble = td;

export { app, expect, request, testDouble };

