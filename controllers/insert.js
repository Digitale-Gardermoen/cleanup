const MongoDB = require('../data/mongo.js');
const db = new MongoDB();

function insert(username, serverName) {
  db.insertUser(username, serverName);
}

module.exports = insert;