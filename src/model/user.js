const { model, Schema } = require('mongoose');
const serviceSchema = require('./service-schema');
const uniqueValidator = require('mongoose-unique-validator');
require('dotenv/config');
const jwt = require('jsonwebtoken');
const userSchema = new Schema({
  id: { type: String, required: true },
  firstName: {
    type: String,
    maxlenght: 30,
    minlength: 2,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    maxlenght: 30,
    minlength: 2,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    maxlenght: 100,
    min: 5,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    maxlenght: 11,
    minlength: 11,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
    trim: true,
  },
  password: { type: String, maxlenght: 30, min: 5, required: true, trim: true },
  imageUrl: { type: String, maxlenght: 200, required: true, trim: true },
  services: { type: [serviceSchema] },
});
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { email: this.email, id: this.id },
    process.env.SECRET,
    { expiresIn: '2 days' },
  );
  return token;
};
uniqueValidator.type = ' ';
userSchema.plugin(uniqueValidator, {
  message: 'Error, {VALUE} is already a registered account',
});
module.exports = model('user', userSchema);
