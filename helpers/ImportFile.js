const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("text/csv") ||
    file.mimetype.includes("application/vnd.ms-excel") ||
    file.mimetype.includes(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) ||
    file.mimetype.includes("text/plain")
  ) {
    cb(null, true);
  } else {
    cb(new Error(file));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "\\upload");
  },
  filename: function (req, file, cb) {
    console.log("=========>FilePath:", file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix + ".csv");
  },
});

module.exports = multer({
  storage: storage,
  fileFilter: excelFilter,
  limits: {
    fileSize: 1000000 * 10, //10mb
  },
}).single("file");
