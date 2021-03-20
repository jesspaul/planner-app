// require modules
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000
const weeksRouter = require("./routes/weeks.js");
const daysRouter = require("./routes/days.js");

//connect to DB
require('./config/database');

// mount middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// mount routes
app.use("/weeks", weeksRouter);
app.use("/", daysRouter);

app.get("/", (req, res) => {
  res.redirect("/weeks");
});

// wildcard route
app.get("*", (req, res) => {
  res.redirect("/weeks");
});

// Web server:
app.listen(PORT, () => {
  console.log("listening");
});
