const MongoDB = require('../data/mongo.js');
const db = new MongoDB();

class EAdmin {
  async deleteAll(username) {
    return await db.deleteUser(username);
  }

  insertAll(username) {
    return db.insertEadminUser(username);
  }
}

module.exports = EAdmin;