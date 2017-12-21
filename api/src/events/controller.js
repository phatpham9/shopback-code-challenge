const { OK } = require('http-status-codes');
const { json } = require('micro');

const { EventModel } = require('../models');

const getList = async (req, res) => {
  try {
    const events = await EventModel.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.send(events);
  } catch (error) {
    res.sendServerError(error);
  }
};

const getDetails = async (req, res) => {
  res.send(req.event);
};

const create = async (req, res) => {
  try {
    const body = await json(req);
    const event = new EventModel({
      ...body,
      owner: req.user._id,
    });

    await event.save();

    res.send(event);
  } catch (error) {
    res.sendServerError(error);
  }
};

const update = async (req, res) => {
  try {
    const body = await json(req);
    Object.assign(req.event, body);
    await req.event.save();

    res.send(req.event);
  } catch (error) {
    res.sendServerError(error);
  }
};

const remove = async (req, res) => {
  try {
    await req.event.remove();

    res.send(req.event);
  } catch (error) {
    res.sendServerError(error);
  }
};

const check = async (req, res) => {
  const query = {
    code: req.params.code,
    'period.from': { $lt: new Date() },
    'period.to': { $gt: new Date() },
  };

  try {
    const existed = await EventModel.count(query);

    if (!existed) {
      return res.sendNotFoundError(new Error('Event not found or expired'));
    }

    return res.send({
      code: OK,
      message: 'Valid',
    });
  } catch (error) {
    return res.sendServerError(error);
  }
};

const join = async (req, res) => {
  const query = {
    code: req.params.code,
    'period.from': { $lt: new Date() },
    'period.to': { $gt: new Date() },
  };

  try {
    const event = await EventModel.findOne(query);

    if (!event) {
      return res.sendNotFoundError(new Error('Event not found'));
    }

    return res.send(event);
  } catch (error) {
    return res.sendServerError(error);
  }
};

module.exports = {
  getList,
  getDetails,
  create,
  update,
  remove,
  check,
  join,
};
