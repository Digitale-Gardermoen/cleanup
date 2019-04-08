const MongoDB = require('../data/mongo.js');
const db = new MongoDB();
const dateString = require('../components/dateString.js');

class EAdmin {
  async deleteAll(username) {
    try {
      let data = await db.deleteUser(username);
      if (data.deletedCount <= 0) return { statuscode: 404 };
      else if (data.deletedCount < data.n) return { statuscode: 409 };
      return { removed: data, statuscode: 200 };
    }
    catch (error) {
      console.error(dateString(), '- got error');
      console.error(error);
      return { statuscode: 500 };
    }
  }
  
  async insertAll(username) {
    try {
      let data = await db.insertEadminUser(username);
      if (typeof data === 'number') return { statuscode: data };
      else if (!data) return { statuscode: 404 };
      return { inserted: data, statuscode: 200 };
    }
    catch (error) {
      console.error(dateString(), '- got error');
      console.error(error);
      return { statuscode: 500 };
    }
  }
}

module.exports = EAdmin;