const mongoose = require("mongoose");
//const validator = require("validator");
const mongodb = require("mongodb");

const barsSchema = new mongodb.Schema({
  billingCycle: Number,
  billingMonth: String,
  amount: String,
  startDate: Date,
  endDate: Date,
  lastEdited: String,
  account: {
    accountName: String,
    dateCrated: Date,
    isActive: String,
    lastEdited: String,
    customer: {
      firstName: String,
      lastName: String,
      address: String,
      status: String,
      dateCreated: Date,
      lastEdited: String,
    },
  },
});
// const barsSchema = new mongoose.Schema({
//   billingCycle: {
//     type: Number,
//     required: true,

//     // validate(value) {
//     //   if (value > 12) {
//     //     throw new Error("Billing Cycle not on range ");
//     //   }
//     // },
//   },
//     billingMonth: String,
//     amount: Number,
//     startDate: {
//     type: Date,
//     required: true,
//     moment: "MM/DD/YYYY",
//     // validate(value) {
//     //   if (value !== moment(Date, "MM/DD/YYYY", true).isValid()) {
//     //     throw new Error("Invalid Start Date");
//     //   }
//     // },
//   },
//   endDate: {
//     type: Date,
//     required: true,
//     moment: "MM/DD/YYYY",
//     // validate(value) {
//     //   if (value !== moment(Date, "MM/DD/YYYY", true).isValid()) {
//     //     throw new Error("Invalid Start Date");
//     //   }
//     // },
//   },
//   lastEdited: String,
//   account: {
//     accountName: String,
//     dateCreated: Date,
//     isActive: String,
//     lastEdited: String,
//     customer: {
//       firstName: String,
//       lastName: String,
//       address: String,
//       status: String,
//       dateCreated: Date,
//       lastEdited: String,
//     },
//   },
//   upload: {
//     type: Buffer,
//   },
// });

// const Billing = mongoose.model("billings", billingSchema);
// module.exports = Billing;

const Bars = mongodb.model("BarsData", barsSchema);

// exports.Bars = Bars;

// mongoose.connect('mongodb://127.0.0.1:27017/Bars-service.isol.joy.song-api', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,

// })
