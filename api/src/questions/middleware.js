const { UNAUTHORIZED } = require('http-status-codes');
const Joi = require('joi');
const Validation = require('micro-joi');

const { EventModel, QuestionModel } = require('../models');

const validate = Validation(Joi.object({
  description: Joi.string().required(),
}).unknown(true));

const getEvent = fn => async (req, res) => {
  const query = {
    _id: req.params.eventId,
  };

  try {
    const event = await EventModel.findOne(query);

    if (!event) {
      return res.sendNotFoundError(new Error('Event not found'));
    }

    req.event = event;

    return fn(req, res);
  } catch (error) {
    return res.sendServerError(error);
  }
};

const checkOwner = fn => (req, res) => {
  if (!req.isAuthenticated() || req.user._id.toString() !== req.event.owner.toString()) {
    return res.send(UNAUTHORIZED, {
      code: UNAUTHORIZED,
      message: 'Unauthorized',
    });
  }

  return fn(req, res);
};

const getQuestion = fn => async (req, res) => {
  const query = {
    _id: req.params.id,
    event: req.event._id,
  };

  try {
    const question = await QuestionModel.findOne(query);

    if (!question) {
      return res.sendNotFoundError(new Error('Question not found'));
    }

    req.question = question;

    return fn(req, res);
  } catch (error) {
    return res.sendServerError(error);
  }
};

module.exports = {
  validate,
  getEvent,
  checkOwner,
  getQuestion,
};
