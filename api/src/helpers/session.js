const cookieSession = require('cookie-session');
const uuidv1 = require('uuid/v1');

const redisClient = require('../helpers/redis-client');
const { UserModel } = require('../models');

const sessionOptions = {
  name: process.env.SESSION_NAME,
  keys: [process.env.SESSION_KEY],
  maxAge: +process.env.SESSION_MAXAGE,
};

const session = async (req, res) => {
  cookieSession(sessionOptions)(req, res, () => {});

  if (!req.session.id) {
    req.session.id = uuidv1();
  } else {
    const sessionData = await redisClient.get(req.session.id);

    if (sessionData) {
      const { user } = JSON.parse(sessionData);

      if (user) {
        const userData = await UserModel.findOne({
          _id: user,
        });

        if (userData) {
          req.user = userData.securedInfo();
        }
      }
    }
  }

  req.isAuthenticated = () => !!req.user;

  req.login = async (user) => {
    await redisClient.set(req.session.id, JSON.stringify({
      user: user._id,
    }));

    req.user = user;
  };

  req.logout = async () => {
    await redisClient.del(req.session.id);

    req.user = null;
  };
};

module.exports = session;
