const dateString = require('../components/dateString.js');
const MongoDB = require('../data/mongo.js');
const db = new MongoDB();

async function fetch(serverName) {
  // check server if it exists
  let server = await db.getServer(serverName);
  if (server.length === 0) {
    console.log(dateString(), '-', 'Added server', serverName, 'to the serverpool');
    console.warn(dateString(), '-', 'If the server is not supposed to be in the serverpool check the origin of the request')
    await db.addServer(serverName);
  }
  return db.findUsers(serverName);
}

module.exports = fetch;