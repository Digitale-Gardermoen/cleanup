const MongoDB = require('../../data/mongo.js');
const db = new MongoDB();

async function deleteUser(username, serverName) {
  let data = await db.deleteUser(username, serverName);
  return data;
}

module.exports = deleteUser;