"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const td = require("testdouble");
const supertest = require('supertest');
// importar aplicação
const api_1 = require("../../../server/api");
const app = api_1.default;
exports.app = app;
const request = supertest;
exports.request = request;
const expect = chai.expect;
exports.expect = expect;
const testdouble = td;
exports.testdouble = testdouble;
