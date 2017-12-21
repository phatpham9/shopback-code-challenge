require('dotenv').config();
require('./models').connect();

const { NOT_FOUND } = require('http-status-codes');

const authRoute = require('./auth');
const eventsRoute = require('./events');
const questionsRoute = require('./questions');
const { router, get } = require('./helpers/custom-microrouter');

const notFoundError = (req, res) => res.send(NOT_FOUND, {
  code: NOT_FOUND,
  message: 'Not found',
});

module.exports = router(
  ...authRoute('/auth'),
  ...eventsRoute('/events'),
  ...questionsRoute('/questions'),
  get('/*', notFoundError),
);
