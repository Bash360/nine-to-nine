const express = require('express');
const userRouter = express.Router();
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  getUserByEmailAndPassword,
} = require('../src/controller/user.js');
userRouter.get('/users', (request, response) => {});
userRouter.post('/users', (request, response) => {});
userRouter.put('/user/:id', (request, response) => {});
userRouter.get('/user/:id', (request, response) => {});
