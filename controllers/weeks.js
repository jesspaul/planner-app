const { set } = require("mongoose");
const moment = require('moment');
const Week = require("../models/week.js");

// index - list all weeks
function index(req, res) {
  Week.find({}, (error, weeks) => {
    weeks.sort(function(a, b) {
      a = a.startDay;
      b = b.startDay;
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });

    res.render("weeks/index", {
      weeks,
      title: 'Weeks Index Page'
    });
  });
}

// new - get user input to create a new week
function newWeek(req, res) {
  Week.find({}, (error, weeks) => {
    res.render("weeks/new", {
      title: 'New Week',
      weeks
    });
  });
}

// create - take user information and create new week in DB
function create(req, res) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const dateInput = moment(req.body.userInputDay);
  
  if (days[dateInput.day()] !== 'Sunday') {
    dateInput.day(0);
  }
 
  req.body.startDay = dateInput;
  req.body.weekdate = dateInput.date();
  req.body.month = months[dateInput.month()];
  req.body.year = dateInput.year();
  
  Week.create(req.body, (error, newWeek) => {
    Week.findById(newWeek._id, function(err, foundWeek) {
      if (typeof(req.body.habitList) === 'object') {
        req.body.habitList.forEach(function(habit) {
          foundWeek.habits.push({content: habit});
        });
      }

      for (let i = 0; i < 7; i++) {
        let dayObj = {
          month: months[dateInput.day(i).month()],
          year: dateInput.day(i).year(),
          weekday: days[dateInput.day(i).day()],
          weekdate: dateInput.day(i).date(),
        };
        foundWeek.days.push(dayObj);
      };

      foundWeek.save(function(err) {
        res.redirect("/weeks");
      });
    });
  });
}

// show - show details of the week - main component of the app
function show(req, res) {
  Week.findById(req.params.id, (err, foundWeek) => {
    res.render("weeks/show", {
      week: foundWeek,
      days: foundWeek.days,
      goals: foundWeek.goals,
      habits: foundWeek.habits,
      title: `${foundWeek.month} ${foundWeek.year}`
    });
  });
}

// delete - delete one week 
function deleteWeek(req, res) {
  Week.deleteOne({ _id: req.params.id }, function(err) {
    res.redirect("/weeks");
  })
}

// edit - get user input to edit one week
function edit(req, res) {
  Week.find({}, function(err, weeks) {
    weeks.forEach(function(week) {
      if (week._id == req.params.id) {
        res.render("weeks/edit", {
          weeks,
          editWeek: week,
          title: 'Edit Week'
        });
      }
    });
  });
}

// put/update - update week with information from user
function update(req, res) {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Week.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateModel) => {
      if (err) {
      } else {
        res.redirect("/weeks");
      }
    }
    );
  }

  module.exports = {
    index,
    new: newWeek,
    create,
    show,
    delete: deleteWeek,
    edit,
    update,
  }
  