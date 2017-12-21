const { get, post, put, del } = require('../helpers/custom-microrouter');
const { getList, create, update, remove, highlight, unhighlight, like, unlike } = require('./controller');
const { validate, getEvent, checkOwner, getQuestion } = require('./middleware');
const { checkLoggedIn } = require('../auth/middleware');

module.exports = resource => [
  get(`${resource}/:eventId`, getEvent(getList)),
  post(`${resource}/:eventId`, getEvent(validate(create))),

  put(`${resource}/:eventId/:id`, checkLoggedIn(getEvent(checkOwner(getQuestion(validate(update)))))),
  del(`${resource}/:eventId/:id`, checkLoggedIn(getEvent(checkOwner(getQuestion(remove))))),

  post(`${resource}/:eventId/:id/highlight`, checkLoggedIn(getEvent(checkOwner(getQuestion(highlight))))),
  del(`${resource}/:eventId/:id/highlight`, checkLoggedIn(getEvent(checkOwner(getQuestion(unhighlight))))),

  post(`${resource}/:eventId/:id/like`, getEvent(getQuestion(like))),
  del(`${resource}/:eventId/:id/like`, getEvent(getQuestion(unlike))),
];
