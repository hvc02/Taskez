const Joi = require("@hapi/joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = registerValidation;
