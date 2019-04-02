const MongoDB = require('../data/mongo.js');
const db = new MongoDB();
const dateString = require('../components/dateString.js');

async function addServer(serverName) {
  try {
    let data = await db.addServer(serverName);
    if (!data) return { statuscode: 404 }
    return { insert: data, statuscode: 200 };
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    return { statuscode: 500 };
  }
}

module.exports = addServer;