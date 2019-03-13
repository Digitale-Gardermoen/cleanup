const MongoDB = require('../data/mongo.js');
const db = new MongoDB();

async function deleteAll(username) {
  return await db.deleteUser(username);
}

module.exports = deleteAll;