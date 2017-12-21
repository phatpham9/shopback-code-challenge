const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { send } = require('micro');
const { router, get, post, put, del } = require('microrouter');

const parseSession = require('./session');

const wrap = cb => (path, fn) => {
  const newFn = async (req, res) => {
    res.send = (...args) => {
      if (args.length === 1) {
        return send(res, OK, ...args);
      }

      return send(res, ...args);
    };

    res.sendNotFoundError = error => send(res, NOT_FOUND, {
      code: NOT_FOUND,
      message: error.message || 'Not found',
      error: process.env.NODE_ENV !== 'production' ? error : undefined,
    });

    res.sendServerError = error => send(res, INTERNAL_SERVER_ERROR, {
      code: INTERNAL_SERVER_ERROR,
      message: error.message || 'Internal server error',
      error: process.env.NODE_ENV !== 'production' ? error : undefined,
    });

    await parseSession(req, res);

    return fn(req, res);
  };

  return cb(path, newFn);
};

module.exports = {
  router,
  get: wrap(get),
  post: wrap(post),
  put: wrap(put),
  del: wrap(del),
};
