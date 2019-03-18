const MongoDB = require('../data/mongo.js');
const db = new MongoDB();
const dateString = require('../components/dateString.js');

class EAdmin {
  async deleteAll(username) {
    return await db.deleteUser(username);
  }

  async insertAll(username) {
    try {
      return await db.insertEadminUser(username);
    }
    catch (error) {
      // if the db function returns an error this is called, but the error isnt logged.
      console.error(dateString(), '- got error');
      console.error(error);
      return [0, 'user was not inserted'];  // this returns to the route and gets resolved to the client.
    }
  }
}

module.exports = EAdmin;