const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  period: {
    from: {
      type: Date,
      default: Date.now,
    },
    to: {
      type: Date,
      required: true,
    },
  },
  owner: {
    type: Mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('Event', schema);
