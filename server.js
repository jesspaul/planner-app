// require modules
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes/index.js");
const weeksRouter = require("./routes/weeks.js");
const daysRouter = require("./routes/days.js");

//connect to DB
require('./config/database');

// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// mount routes
app.use("/", indexRouter);
app.use("/weeks", weeksRouter);
app.use("/", daysRouter);

// wildcard route
app.get("*", (req, res) => {
  res.redirect("/");
});

// Web server:
app.listen(PORT, () => {
  console.log("listening");
});
