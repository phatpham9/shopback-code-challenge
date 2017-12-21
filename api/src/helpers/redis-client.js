const Redis = require('redis');
const Util = require('util');

const client = Redis.createClient(process.env.REDIS_URL);

module.exports = {
  set: Util.promisify(client.set.bind(client)),
  get: Util.promisify(client.get.bind(client)),
  del: Util.promisify(client.del.bind(client)),
};
