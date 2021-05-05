const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017/";
const databaseName = "bars_db";

const db = MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => client.db(databaseName)
);

module.exports.Bars = db;
