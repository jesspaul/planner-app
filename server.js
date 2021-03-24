// require modules
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes/index.js");
const weeksRouter = require("./routes/weeks.js");
const entriesRouter = require("./routes/entries.js");
const usersRouter = require('./routes/users');

//connect to DB
require('./config/database');

// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false
}));

// mount routes
app.use("/", indexRouter);
app.use("/weeks", weeksRouter);
app.use("/", entriesRouter);
app.use('/users', usersRouter);

// wildcard route
app.get("*", (req, res) => {
  res.redirect("/");
});

// Web server:
app.listen(PORT, () => {
  console.log("listening");
});
