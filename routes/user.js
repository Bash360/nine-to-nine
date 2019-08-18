const express = require('express');
const userRouter = express.Router();
const {
  checkType,
  checkSize,
  checkUser,
} = require('../src/middleware/validate-routes/user');
const checkAuth = require('../src/middleware/authenticate-routes/auth');

const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  getUserByEmailAndPassword,
} = require('../src/controller/user.js');
userRouter.get('/allusers', (req, res) => {
  getAllUsers()
    .then(users => res.json(users).status(200))
    .catch(error => {
      res.json(error.message).status(200);
    });
});
userRouter.post(
  '/register',
  [checkUser, checkType, checkSize],
  (req, res, next) => {
    let {
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      imageUrl,
    } = req.body;
    createUser({
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      imageUrl,
    })
      .then(user => {
        let token = user.token;
        res.header('x-auth-token', token);
        res.status(200).json({
          id: user.id,
          firstName: user.lastName,
          phone: user.phone,
          gender: user.gender,
          email: user.email,
          imageUrl: user.imageUrl,
        });
      })
      .catch(error => {
        return res.status(400).json(error.message);
      });
  },
);
userRouter.put('/user', checkAuth, (req, res) => {});
userRouter.get('/user/:id', checkAuth, (req, res) => {});
module.exports = userRouter;
