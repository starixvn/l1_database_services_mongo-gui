const mongoClient = require('mongodb').MongoClient;
const argv = require('minimist')(process.argv.slice(2));

class DataBase {
  constructor() {}

  static GetDB() {
    if (typeof DataBase.mongo === 'undefined') {
      DataBase.InitDB();
    }
    return DataBase.mongo;
  }

  static InitDB(app) {
    const url =
      argv.u ||
      process.env.URL ||
      'mongodb://lmn_backend:LmnBackend@10.10.50.12:39100,10.10.50.13:39100,10.10.50.14:39100/?replicaSet=L1Local';

    console.log(`> Connecting to mongoDB @ ${url}`);
    mongoClient
      .connect(url, { useUnifiedTopology: true })
      .then((client) => {
        if (!client) {
          console.log('> Failed to connect mongoDB -  no client');
          process.exit();
        } else {
          console.log('> Connected');
          DataBase.mongo = client;
          if (app) app.emit('connectedToDB');
        }
      })
      .catch((err) => {
        console.log(`> Failed to connect mongoDB - ${err}`);
        process.exit();
      });
  }

  static ConnectToDb(dbName) {
    return this.GetDB().db(dbName);
  }

  static ConnectToCollection(dbName, collectionName) {
    return this.GetDB().db(dbName).collection(collectionName);
  }

  static Disconnect() {
    return this.GetDB().close();
  }
}

module.exports = DataBase;
