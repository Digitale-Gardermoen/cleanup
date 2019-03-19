const MongoDB = require('../data/mongo.js');
const db = new MongoDB();
const dateString = require('../components/dateString.js');

async function deleteUser(username, serverName) {
  try {
    let data = await db.deleteUserByServerName(username, serverName); // username and servername is case-sensitive
    if (data === null) return 'did not find user: ' + data;
    else return data;
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    return [0, 'got error, check if user was removed with fetch'];
  }
}

module.exports = deleteUser;