const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  name: String,
}, { timestamps: true });

const habitSchema = new Schema({
  name: String,
  date: Date,
  complete: Boolean,
}, { timestamps: true });

const entrySchema = new Schema({
  content: String,
  category: String,
}, { timestamps: true })

const daySchema = new Schema({
  month: String,
  year: Number,
  weekday: String,
  weekdate: Number,
  entries: [entrySchema],
}, { timestamps: true });

const weekSchema = new Schema({
  startDay: String,
  endDay: String,
  month: String,
  year: Number,
  weekday: String,
  weekdate: Number,
  days: [daySchema],
  habits: [habitSchema],
  goals: [goalSchema],
}, { timestamps: true });

module.exports = mongoose.model("Week", weekSchema);

