const { UNAUTHORIZED } = require('http-status-codes');
const Joi = require('joi');
const Validation = require('micro-joi');

const validate = Validation(Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).max(100),
}));

const checkLoggedIn = fn => async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.send(UNAUTHORIZED, {
      code: UNAUTHORIZED,
      message: 'Unauthorized',
    });
  }

  return fn(req, res);
};

module.exports = {
  validate,
  checkLoggedIn,
};
