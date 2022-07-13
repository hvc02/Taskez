const Joi = require("@hapi/joi");

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = loginValidation;
