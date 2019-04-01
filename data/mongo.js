require('dotenv').config();
const dateString = require('../components/dateString.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flaggedUserSchema = new Schema(
  {
    username: { type: String, required: true },
    serverName: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

flaggedUserSchema.index({ username: -1, serverName: 1 }, { unique: true, name: 'ix_unique-username-servername' });

const serverSchema = new Schema({
  serverName: { type: String, unique: true }
});

class MongoDB {
  constructor() {
    this.conn = mongoose.connect(
      process.env.MONGOOSE_MONGO, {
        useNewUrlParser: true,
        useCreateIndex: true,                 // use this to remove the warning: DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
        user: process.env.MONGOOSE_USERNAME,
        pass: process.env.MONGOOSE_PASSWORD,
        dbName: process.env.MONGOOSE_DBNAME
      },
      function (err) {
        if (err) console.error('Failed to connect to mongo', err);    // this might be changed to do some better errorhandling later...
      }
    );

    this.flaggedUser = mongoose.model('flaggedUser', flaggedUserSchema);
    this.servers = mongoose.model('server', serverSchema);
  }

  async insertUser(username, serverName) {
    try {
      return await this.flaggedUser.create({ username: username, serverName: serverName });
    }
    catch (error) {
      console.error(dateString(), '- got error');
      console.error(error.name, error.errmsg);
      return [0, 'user was not inserted'];
    }
  }

  async insertEadminUser(username) {
    try {
      let insertArray = [];                                         // create the array we are inserting and returning
      let serverList = await this.servers.find({}).select('-_id');  // get the servers we are addind to the collection

      for (let i in serverList) {
        //Loop over the serverlist to create a insert object, then append it to the insertArray
        let insertObj = { username: username, serverName: serverList[i].serverName };
        insertArray.push(insertObj);
      }
      // use insertMany to insert the entire array, instead of doing this in the loop.
      // this unsures we can get one error message instead of n * amount of servers.
      // any error that happens here is in most cases from mongoose/MongoDB
      await this.flaggedUser.insertMany(insertArray);
      return insertArray;
    }
    catch (error) {
      console.error(dateString(), '- got error');
      console.error(error.name, error.errmsg);
      return [0, 'user was not inserted', error.name, error.errmsg];
    }
  }

  async deleteUserByServerName(username, serverName) {
    return this.flaggedUser.findOneAndDelete({
      username: username,
      serverName: serverName
    });
  }

  async deleteUser(username) {
    return this.flaggedUser.deleteMany({
      username: username
    });
  }

  async findUsers(serverName) {
    let dateBack = new Date();                  // create a date
    dateBack.setDate(dateBack.getDate() - 14);  // set the date to 14 days back
    return this.flaggedUser
      .find({ serverName: serverName })         // search the db based on the servername, get all documents for that server.
      .where('createdAt')                       // where the createAt property so we can chain.
      .lte(dateBack);                           // check if the document have less than or equals to the date.
  }

  async addServer(serverName) {
    return await this.servers.create({ serverName: serverName });
  }

  async getServer(serverName) {
    return await this.servers.find({ serverName: serverName })
  }
}

module.exports = MongoDB;