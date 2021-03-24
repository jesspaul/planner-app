const { set } = require("mongoose");
const moment = require('moment');
const Month = require("../models/month.js");

// show - show details of the week - main component of the app
function show(req, res) {
  Month.findById(req.params.monthId, (err, foundMonth) => {
    const foundWeek = foundMonth.weeks.id(req.params.weekId);
    res.render("weeks/show", {
      month: foundMonth,
      week: foundWeek,
      days: foundWeek.days,
      goals: foundWeek.goals,
      habits: foundWeek.habits,
      title: `${foundWeek.month} ${foundWeek.year}`
    });
  });
}

module.exports = {
  show
}
  