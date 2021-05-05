const fs = require("fs");
const csv = require("csvtojson");
const { validateFile } = require("../helpers/validateFile");
const mongodb = require("mongodb");
const assert = require("assert");
const MongoClient = mongodb.MongoClient;

exports.importCsv = async (req, res) => {
  try {
    if (req.file) {
      const json = await csv({ noheader: true }).fromFile(req.file.path);

      const valid = validateFile(json);

      if (!valid.success) {
        if (req.file.path) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({
          success: valid.success,
          message: valid.message,
          error: valid.error,
        });
      }
      const databaseName = "bars_db";

      json.forEach(async ({ field1, field2, field3 }) => {
        let billingCycle = field1;
        let startDate = field2;
        let endDate = field3;

        try {
          console.log(field1);
          const connectionURL = "mongodb://127.0.0.1:27017/";
          MongoClient.connect(
            connectionURL,
            { useNewUrlParser: true },
            (error, client) => {
              if (error) {
                console.log(error);
                return console.log("Unable to connect to database!");
              }
              console.log("connected to db");
              const db = client.db(databaseName);

              db.collection("billings")
                .find({})
                .toArray(function (err, docs) {
                  //compare to csv on line 28-30
                  console.log(docs);
                });
            }
          );
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        }
      });

      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(200).send(valid);
    } else {
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return req.status(200).json({
        message: "Something went wrong",
      });
    }
  } catch (err) {
    if (req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({
      error: err.message,
    });
  }
};
