const mongodb = require("mongodb");
//const {Bars} = require("../../bars.model");
const MongoClient = mongodb.MongoClient;
var NumberInt = require("mongodb").Int32;
module.exports = function () {
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "bars_db";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    db.collection("billings").insertMany(
      [
        {
          billingCycle: NumberInt(1),
          billingMonth: "January",
          amount: 7000,
          startDate: new Date("2013-1-15"),
          endDate: new Date("2013-2-14"),
          lastEdited: "admin",
          account: {
            accountName: "AIRA FAUNA ANSAY",
            dateCreated: new Date(),
            isActive: "Y",
            lastEdited: "admin",
            customer: {
              firstName: "Aira Fauna",
              lastName: "Ansay",
              address: "Silang, Cavite",
              status: "Y",
              dateCreated: new Date(),
              lastEdited: "admin",
            },
          },
        },
        {
          billingCycle: NumberInt(1),
          billingMonth: "January",
          amount: 15000,
          startDate: new Date("2016-1-15"),
          endDate: new Date("2016-2-14"),
          lastEdited: "admin",
          account: {
            accountName: "STEPHEN ABAD",
            dateCreated: new Date(),
            isActive: "Y",
            lastEdited: "admin",
            customer: {
              firstName: "Stephen",
              lastName: "Abad",
              address: "Metro Manila",
              status: "Y",
              dateCreated: new Date(),
              lastEdited: "admin",
            },
          },
        },
        {
          billingCycle: NumberInt(2),
          billingMonth: "February",
          amount: 10000,
          startDate: new Date("2016-2-01"),
          endDate: new Date("2016-2-28"),
          lastEdited: "admin",
          account: {
            accountName: "STEPHEN ABAD",
            dateCreated: new Date(),
            isActive: "Y",
            lastEdited: "admin",
            customer: {
              firstName: "Stephen",
              lastName: "Abad",
              address: "Metro Manila",
              status: "Y",
              dateCreated: new Date(),
              lastEdited: "admin",
            },
          },
        },
        {
          billingCycle: NumberInt(1),
          billingMonth: "January",
          amount: 25000,
          startDate: new Date("2016-1-01"),
          endDate: new Date("2016-1-31"),
          lastEdited: "admin",
          account: {
            accountName: "DANIEL JEORGE BARRION",
            dateCreated: new Date(),
            isActive: "Y",
            lastEdited: "admin",
            customer: {
              firstName: "Daniel Jeorge",
              lastName: "Barrion",
              address: "Mandaluyong City",
              status: "Y",
              dateCreated: new Date(),
              lastEdited: "admin",
            },
          },
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert tasks!");
        }

       // console.log(result.ops);
      }
    );
  }
);
}