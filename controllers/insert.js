const MongoDB = require('../data/mongo.js');
const db = new MongoDB();
const dateString = require('../components/dateString.js');

async function insert(username, serverName) {
  try {
    if ((!username) || (!serverName)) return { statuscode: 404 };
    else {
      let data = await db.insertUser(username, serverName);
      if (data === 'errored') return { statuscode: 500 };
      else if (!data) return { statuscode: 404 };
      return { inserted: data, statuscode: 200 };
    }
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    return { statuscode: 500 };
  }
}

module.exports = insert;