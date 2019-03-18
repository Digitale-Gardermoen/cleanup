const MongoDB = require('../data/mongo.js');
const db = new MongoDB();
const dateString = require('../components/dateString.js');

async function insert(username, serverName) {
  try {
    let data = await db.insertUser(username, serverName);
    return data;
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    return [0, 'caught error, check if user was inserted with fetch'];
  }
}

module.exports = insert;