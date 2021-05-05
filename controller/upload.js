const fs = require("fs");
const csv = require("csvtojson");
const { validateFile } = require("../helpers/validateFile");
const {Bars} = require("../models/bars.model.js")

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

      json.forEach(async () => {
        try {
          const barsData = await Bars.find();
          console.log(barsData)
        } catch (error) {
          console.log(error)
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
