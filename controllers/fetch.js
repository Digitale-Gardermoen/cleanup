const dateString = require('../components/dateString.js');
const MongoDB = require('../data/mongo.js');
const db = new MongoDB();

async function fetch(serverName) {
  // check server if it exists
  let server = await db.getServer(serverName);
  if (server.length === 0) {
    db.addServer(serverName);
    console.log(dateString(), '-', 'Added server', serverName, 'to the serverpool');
    console.warn(dateString(), '-', 'If the server is not supposed to be in the serverpool check the origin of the request')
  }

  try {
    let data = await db.findUsers(serverName);
    if (!data) return { statuscode: 404 };
    return { users: data, statuscode: 200 };
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    return { statuscode: 500 };
  }
}

module.exports = fetch;