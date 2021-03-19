const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  content: String,
  category: String,
}, { timestamps: true })

const daySchema = new mongoose.Schema({
  day: Date,
  entries: [entrySchema],
  week: {
    type: Schema.Types.ObjectId,
    ref: 'Week'
  }
}, { timestamps: true });

module.exports = mongoose.model('Day', daySchema);

