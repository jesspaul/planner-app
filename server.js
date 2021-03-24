// require modules
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const moment = require('moment');
const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes/index.js");
const weeksRouter = require("./routes/weeks.js");
const entriesRouter = require("./routes/entries.js");

//connect to DB
require('./config/database');

// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// mount routes
app.use("/", indexRouter);
app.use("/weeks", weeksRouter);
app.use("/", entriesRouter);

// wildcard route
app.get("*", (req, res) => {
  res.redirect("/");
});

// Web server:
app.listen(PORT, () => {
  console.log("listening");
});
