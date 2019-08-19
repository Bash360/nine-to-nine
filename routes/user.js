const express = require('express');
const userRouter = express.Router();
const {
  checkType,
  checkSize,
  checkUser,
  checkLoginDetails,
  checkUserID,
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
      imageUrl = 'default.jpg',
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
        res.status(200).json(user);
      })
      .catch(error => {
        return res.status(400).json(error.message);
      });
  },
);
userRouter.post('/login', checkLoginDetails, (req, res, next) => {
  const { email, password } = req.body;
  getUserByEmailAndPassword(email, password)
    .then(data =>
      res
        .header('x-auth-token', data.token)
        .status(200)
        .json(data),
    )
    .catch(error => res.status(400).json(error));
});
userRouter.put('/user', checkAuth, (req, res) => {});
userRouter.get('/', checkAuth, (req, res) => {
  const { id } = req.userDetails;
  getUser(id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(400).json(error));
});
module.exports = userRouter;
