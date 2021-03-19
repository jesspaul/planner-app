const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  name: String,
}, { timestamps: true });

const habitSchema = new mongoose.Schema({
  name: String,
  date: Date,
  complete: Boolean,
}, { timestamps: true });

const weekSchema = new mongoose.Schema({
  startDay: Date,
  endDay: Date,
  // days: [],
  habits: [habitSchema],
  goals: [goalSchema],
}, { timestamps: true });

module.exports = mongoose.model("Week", weekSchema);

