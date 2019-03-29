const MongoDB = require('../data/mongo.js');
const db = new MongoDB();
const dateString = require('../components/dateString.js');

async function addServer(serverName) {
  try {
    return await db.addServer(serverName);
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    return [0, 'caught error, check error log on the web server'];
  }
}

module.exports = addServer;