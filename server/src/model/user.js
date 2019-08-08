const { model,Schema}= require('mongoose');
const serviceSchema= require('./service-schema');
const userSchema = new Schema({
  firstName: { type: String, maxlenght: 30, minlength: 2, required: true, trim: true },
  lastName: { type: String, maxlenght: 30, minlength: 2, required: true, trim: true },
  email: { type: String, maxlenght: 100, min: 5, required: true, trim: true, unique: true },
  phone: { type: String, maxlenght: 11, minlength: 11, required: true, trim: true },
  gender: { type: String, enum: ['male', 'female'], required: true, trim: true },
  password: { type: String, maxlenght: 30, min: 5, required: true, trim: true },
  imageUrl: { type: String, maxlenght: 100, required: true, default: 'default.jpg', trim: true },
  services: { type: [serviceSchema] }
});
module.exports = model( 'user',userSchema);

