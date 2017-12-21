const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  highlighted: {
    type: Boolean,
    default: false,
  },
  likes: [{
    user: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  meta: {
    numLikes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  event: {
    type: Mongoose.Schema.ObjectId,
    ref: 'Event',
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('Question', schema);
