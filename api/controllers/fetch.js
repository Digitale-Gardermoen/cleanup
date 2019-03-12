const MongoDB = require('../../data/mongo.js');
const db = new MongoDB();

function fetch(serverName) {
  return db.findUsers(serverName);
}

module.exports = fetch;