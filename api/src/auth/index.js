const { get, post, del } = require('../helpers/custom-microrouter');
const { register, getUser, login, logout } = require('./controller');
const { validate } = require('./middleware');

module.exports = resource => [
  post(`${resource}/register`, validate(register)),
  get(`${resource}/login`, getUser),
  post(`${resource}/login`, validate(login)),
  del(`${resource}/login`, logout),
];
