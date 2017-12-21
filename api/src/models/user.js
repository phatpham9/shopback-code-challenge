const Mongoose = require('mongoose');
const crypto = require('crypto');

const schema = new Mongoose.Schema({
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email',
    ],
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

schema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

schema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(Buffer.from(password, 'binary'), Buffer.from(this.salt, 'binary'), 10000, 64, 'sha1').toString('base64');
  }

  return password;
};

schema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

schema.methods.securedInfo = function () {
  const { _id, email } = this.toJSON();

  return {
    _id,
    email,
  };
};

module.exports = Mongoose.model('User', schema);
