const MongoDB = require('../data/mongo.js');
const db = new MongoDB();
const dateString = require('../components/dateString.js');

async function addServer(serverName) {
  try {
    let data = await db.addServer(serverName);
    if (typeof data === 'number') return { statuscode: data };
    else if (!data) return { statuscode: 404 }
    return { inserted: data, statuscode: 200 };
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    return { statuscode: 500 };
  }
}

module.exports = addServer;