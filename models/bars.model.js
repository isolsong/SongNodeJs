const mongoose = require("mongoose");

const barsSchema = new mongoose.Schema({
  billingCycle: { type: Number, required: true },
});

const Bars = mongoose.model("BarsData", barsSchema);

exports.Bars = Bars;
