const express = require('express');
const serviceRouter = express.Router();
const {
  createService,
  getAllServices,
  publishService,
  archiveService,
  getService,
} = require('../src/controller/user.js');
serviceRouter.get('services', (request, response) => {});
serviceRouter.post('service', (request, response) => {});
serviceRouter.delete('service:id', (request, response) => {});
serviceRouter.put('service:id', (request, response) => {});
