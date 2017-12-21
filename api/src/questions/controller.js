const { BAD_REQUEST } = require('http-status-codes');
const { json } = require('micro');

const { QuestionModel } = require('../models');

const SORT_WHITELIST = [{
  name: 'likes',
  by: 'meta.numLikes',
}, {
  name: 'created-time',
  by: 'createdAt',
}];
const ORDER_WHITELIST = [-1, 1];
const DEFAULT_SORT = 'meta.numLikes';
const DEFAULT_ORDER = 1;

const MAX_HIGHLIGHTED = 3;

const parseSort = (sortName, order = DEFAULT_ORDER) => {
  const sort = SORT_WHITELIST.find(({ name }) => name === sortName);

  if (!sort) {
    return {
      [DEFAULT_SORT]: DEFAULT_ORDER,
    };
  }

  return {
    [sort.by]: ORDER_WHITELIST.indexOf(+order) !== -1 ? +order : DEFAULT_ORDER,
  };
};

const getList = async (req, res) => {
  const query = {
    event: req.event._id,
  };
  const sort = parseSort(req.query.sort, req.query.order);

  try {
    const questions = await QuestionModel.find(query)
      .sort(sort);

    res.send(questions);
  } catch (error) {
    res.sendServerError(error);
  }
};

const create = async (req, res) => {
  try {
    const body = await json(req);
    const question = new QuestionModel({
      ...body,
      event: req.event._id,
      owner: req.session.id,
    });

    await question.save();

    res.send(question);
  } catch (error) {
    res.sendServerError(error);
  }
};

const update = async (req, res) => {
  try {
    const body = await json(req);

    Object.assign(req.question, body);
    await req.question.save();

    return res.send(req.question);
  } catch (error) {
    return res.sendServerError(error);
  }
};

const remove = async (req, res) => {
  try {
    await req.question.remove();

    return res.send(req.question);
  } catch (error) {
    return res.sendServerError(error);
  }
};

const highlight = async (req, res) => {
  if (req.question.highlighted) {
    return res.send(req.question);
  }

  try {
    const numHighlighted = await QuestionModel.count({
      highlighted: true,
      event: req.event._id,
    });

    if (numHighlighted >= MAX_HIGHLIGHTED) {
      return res.send(BAD_REQUEST, {
        code: BAD_REQUEST,
        message: 'Maximum highlighted questions',
      });
    }

    req.question.highlighted = true;
    await req.question.save();

    return res.send(req.question);
  } catch (error) {
    return res.sendServerError(error);
  }
};

const unhighlight = async (req, res) => {
  if (!req.question.highlighted) {
    return res.send(req.question);
  }

  try {
    req.question.highlighted = false;
    await req.question.save();

    return res.send(req.question);
  } catch (error) {
    return res.sendServerError(error);
  }
};

const like = async (req, res) => {
  if (req.question.likes.find(({ user }) => user === req.session.id)) {
    return res.send(BAD_REQUEST, {
      code: BAD_REQUEST,
      message: 'Already liked this question',
    });
  }

  try {
    req.question.likes.splice(req.question.likes.length - 1, 0, {
      user: req.isAuthenticated() ? req.user._id.toString() : req.session.id,
      createdAt: Date.now(),
    });
    req.question.meta.numLikes = req.question.likes.length;
    req.question.markModified('likes');
    await req.question.save();

    return res.send(req.question);
  } catch (error) {
    return res.sendServerError(error);
  }
};

const unlike = async (req, res) => {
  const index = req.question.likes.map(({ user }) => user).indexOf(req.isAuthenticated() ? req.user._id.toString() : req.session.id);

  if (index === -1) {
    return res.send(BAD_REQUEST, {
      code: BAD_REQUEST,
      message: 'Have not liked this question yet',
    });
  }

  try {
    req.question.likes.splice(index, 1);
    req.question.meta.numLikes = req.question.likes.length;
    req.question.markModified('likes');
    await req.question.save();

    return res.send(req.question);
  } catch (error) {
    return res.sendServerError(error);
  }
};

module.exports = {
  getList,
  create,
  update,
  remove,
  highlight,
  unhighlight,
  like,
  unlike,
};
