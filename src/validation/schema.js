const joi = require('@hapi/joi');
const postSchema = {
  firstName: joi
    .string()
    .trim()
    .min(3)
    .required(),
  lastName: joi
    .string()
    .trim()
    .lowercase()
    .min(3)
    .required(),
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .required(),
  phone: joi
    .string()
    .trim()
    .lowercase()
    .max(11)
    .required(),
  gender: joi
    .string()
    .trim()
    .lowercase()
    .max(6)
    .min(4)
    .required(),
  password: joi
    .string()
    .trim()
    .min(6)
    .max(50)
    .required(),
  imageUrl: joi.string().optional(),
  photo: joi.any().optional(),
};
const updateSchema = {
  firstName: joi
    .string()
    .trim()
    .lowercase()
    .min(3)
    .optional(),
  lastName: joi
    .string()
    .trim()
    .lowercase()
    .min(3)
    .optional(),
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .required(),
  phone: joi
    .string()
    .trim()
    .lowercase()
    .max(11)
    .optional(),
};
const searcSchema = {
  q: joi
    .string()
    .required()
    .lowercase(),
};
const serviceSchema = {
  serviceID: joi
    .string()
    .required()
    .lowercase(),
  timeCreated: joi.date().required(),
  userName: joi
    .string()
    .trim()
    .required()
    .lowercase(),
  userId: joi
    .string()
    .trim()
    .required()
    .lowercase(),
  category: joi
    .string()
    .min(10)
    .max(100)
    .trim()
    .required()
    .lowercase(),
  role: joi
    .string()
    .min(5)
    .max(50)
    .trim()
    .required()
    .lowercase(),
  serviceTitle: joi
    .string()
    .min(5)
    .max(20)
    .trim()
    .required()
    .lowercase(),
  description: joi
    .string()
    .min(10)
    .max(200)
    .trim()
    .required()
    .lowercase(),
  published: joi
    .boolean()
    .default(false)
    .required(),
  archived: joi
    .boolean()
    .default(false)
    .required(),
};
const searchSchema = {
  category: joi
    .string()
    .min(10)
    .max(100)
    .trim()
    .lowercase(),
  serviceTitle: joi
    .string()
    .min(5)
    .max(20)
    .trim()
    .lowercase(),
  description: joi
    .string()
    .min(10)
    .max(200)
    .trim()
    .lowercase(),
};
const getServiceSchema = {
  serviceID: joi
    .string()
    .required()
    .lowercase(),
};
const getUserSchema = {
  id: joi
    .string()
    .trim()
    .required()
    .lowercase(),
};
module.exports = {
  postSchema,
  serviceSchema,
  searcSchema,
  getServiceSchema,
  getUserSchema,
};
