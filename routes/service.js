const express = require('express');
const serviceRouter = express.Router();
const {
  createService,
  getAllServices,
  publishService,
  archiveService,
  getService,
} = require('../src/controller/user.js');
serviceRouter.get('/allservices', (request, response, next) => {
  getAllServices()
    .then(services => response.status(200).json(services))
    .catch(error => response.status(400).json(error));
});
serviceRouter.post('service', (request, response) => {});
serviceRouter.delete('service:id', (request, response) => {});
serviceRouter.put('service:id', (request, response) => {});
module.exports = serviceRouter;
