const MongoDB = require('../data/mongo.js');
const db = new MongoDB();

class EAdmin {
  async deleteAll(username) {
    return await db.deleteUser(username);
  }

  insert(username) {
    db.insertUser(username);
  }
}

module.exports = EAdmin;