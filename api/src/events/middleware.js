const Joi = require('joi');
const Validation = require('micro-joi');

const { EventModel } = require('../models');

const validate = Validation(Joi.object({
  code: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  period: Joi.object({
    from: Joi.date().max(Joi.ref('to')).required(),
    to: Joi.date().required(),
  }).required(),
}).unknown(true));

const getEvent = fn => async (req, res) => {
  const query = {
    _id: req.params.id,
    owner: req.user._id,
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

module.exports = {
  validate,
  getEvent,
};
