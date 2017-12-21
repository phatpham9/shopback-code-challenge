const Mongoose = require('mongoose');

const UserModel = require('./user');
const EventModel = require('./event');
const QuestionModel = require('./question');

const connect = () => {
  Mongoose.Promise = Promise;
  Mongoose.set('debug', true);
  Mongoose.connect(process.env.MONGO_URL, { useMongoClient: true });
};

module.exports = {
  connect,
  UserModel,
  EventModel,
  QuestionModel,
};
