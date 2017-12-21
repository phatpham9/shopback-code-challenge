const { get, post, put, del } = require('../helpers/custom-microrouter');
const { getList, getDetails, create, update, remove, check, join } = require('./controller');
const { validate, getEvent } = require('./middleware');
const { checkLoggedIn } = require('../auth/middleware');

module.exports = resource => [
  get(resource, checkLoggedIn(getList)),
  post(resource, checkLoggedIn(validate(create))),
  get(`${resource}/:id`, checkLoggedIn(getEvent(getDetails))),
  get(`${resource}/:code/check`, check),
  get(`${resource}/:code/join`, join),
  put(`${resource}/:id`, checkLoggedIn(getEvent(validate(update)))),
  del(`${resource}/:id`, checkLoggedIn(getEvent(remove))),
];
