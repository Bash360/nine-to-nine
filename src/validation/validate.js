const joi = require('@hapi/joi');
const validate = (reqBody, schema) => {
  let { error } = joi.validate(reqBody, schema, { abortEarly: false });
  if (error) {
    let errors = error.details.reduce((totalErrors, error) => {
      return `${totalErrors} ${error.message.replace(/\"/g, '')} `;
    }, ' ');
    return errors;
  }
  return false;
};
module.exports = validate;
