const MongoDB = require('../data/mongo.js');
const db = new MongoDB();
const dateString = require('../components/dateString.js');

async function deleteUser(username, serverName) {
  try {
    let data = await db.deleteUserByServerName(username, serverName); // username and servername is case-sensitive
    if (!data) return { statuscode: 404 };
    return { removed: data, statuscode: 200 };
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    return { statuscode: 500 };
  }
}

module.exports = deleteUser;