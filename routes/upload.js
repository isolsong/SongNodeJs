const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../helpers/ImportFile");
const uploadHandler = require("../controller/upload");

router.get("/upload", (req, res) => {
  res.status(200).send("upload response!");
});

router.post(
  "/upload",
  async (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      } else if (err) {
        console.log(err)
        return res.status(404).json({
          success: false,
          error: "File format not supported for processing",
        });
      }
      next();
    });
  },
  uploadHandler.importCsv
);

module.exports = router;
