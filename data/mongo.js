require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flaggedUserSchema = new Schema(
  {
    username: String,
    serverName: String
  },
  {
    timestamps: true
  }
);

class MongoDB {
  constructor() {
    this.conn = mongoose.connect(
      process.env.MONGOOSE_MONGO, {
        useNewUrlParser: true,
        user: process.env.MONGOOSE_USERNAME,
        pass: process.env.MONGOOSE_PASSWORD,
        dbName: process.env.MONGOOSE_DBNAME
      },
      function (err) {
        if (err) console.error('Failed to connect to mongo', err);    // this might be changed to do some better errorhandling later...
      }
    );

    this.flaggedUser = mongoose.model('flaggedUser', flaggedUserSchema);

  }

  async insertUser(username, serverName) {
    return this.flaggedUser.create({ username: username, serverName: serverName });
  }

  async deleteUser(username, serverName) {
    return this.flaggedUser.findOneAndDelete({
      username: username,
      serverName: serverName
    });
  }

  async findUsers(serverName) {
    let dateBack = new Date();                  // create a date
    dateBack.setDate(dateBack.getDate() - 14);  // set the date to 14 days back
    console.log(dateBack);
    return this.flaggedUser
      .find({ serverName: serverName })         // search the db based on the servername, get all documents for that server.
      .where('createdAt')                       // where the createAt property so we can chain.
      .lte(dateBack);                           // check if the document have less than or equals to the date.
  }
}

module.exports = MongoDB;