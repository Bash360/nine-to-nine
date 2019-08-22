const jwt = require('jsonwebtoken');
require('dotenv/config');
function checkAuth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json('Acess denied no token provided');
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userDetails = decoded;
    next();
  } catch (error) {
    res.status(400).json('invalid token');
  }
}
module.exports = checkAuth;
