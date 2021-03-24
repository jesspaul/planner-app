const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  content: String,
}, { timestamps: true });

const habitSchema = new Schema({
  content: String,
  sunComplete: Boolean,
  monComplete: Boolean,
  tueComplete: Boolean,
  wedComplete: Boolean,
  thuComplete: Boolean,
  friComplete: Boolean,
  satComplete: Boolean,
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
  weekdate: String,
  month: String,
  year: Number,
  days: [daySchema],
  habits: [habitSchema],
  goals: [goalSchema],
}, { timestamps: true });

const monthSchema = new Schema({
  month: String,
  year: Number,
  weeks: [weekSchema],
})

module.exports = mongoose.model("Month", monthSchema);