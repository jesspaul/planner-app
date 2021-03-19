require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

// Load up mongoose npm as mongoose:
const mongoose = require("mongoose");

// Connect mongoose to mongo db:
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection.once("open", () => {
    console.log("connected to mongo");
  });