const { json } = require('micro');
const { OK, BAD_REQUEST } = require('http-status-codes');

const { UserModel } = require('../models');

const register = async (req, res) => {
  const { email, password } = await json(req);

  const existed = await UserModel.count({
    email,
  });

  if (existed) {
    return res.send(BAD_REQUEST, {
      code: BAD_REQUEST,
      message: 'Email existed',
    });
  }

  const user = new UserModel({
    email,
    password,
  });

  await user.save();

  const securedUser = user.securedInfo();

  await req.login(securedUser);

  return res.send(securedUser);
};

const getUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send({
      _id: req.session.id,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = await json(req);

  const user = await UserModel.findOne({
    email,
  });

  if (!user || !user.authenticate(password)) {
    return res.send(BAD_REQUEST, {
      code: BAD_REQUEST,
      message: 'Wrong email or password',
    });
  }

  const securedUser = user.securedInfo();

  await req.login(securedUser);

  return res.send(securedUser);
};

const logout = async (req, res) => {
  await req.logout();

  res.send({
    code: OK,
    message: 'Logged out',
  });
};

module.exports = {
  register,
  getUser,
  login,
  logout,
};
