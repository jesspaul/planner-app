const { set } = require("mongoose");
const moment = require('moment');
const Month = require("../models/month.js");

// index - list all months
function index(req, res) {
  Month.find({}, (error, months) => {
    months.sort(function(a, b) {
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

    res.render("months/index", {
      months,
      title: 'Months Index Page'
    });
  });
}

// new - get user input to create a new month
function newMonth(req, res) {
  Month.find({}, (error, months) => {
    res.render("months/new", {
      title: 'New Month',
      months
    });
  });
}

// create - take user information and create new month in DB
function create(req, res) {
  const userInput = moment(req.body.userMonth);
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  req.body.month = months[userInput.month()];
  req.body.year = userInput.year();
  
  Month.create(req.body, (error, newMonth) => {
    if (error) {
      console.log(error)
    } else {
      Month.findById(newMonth._id, function(err, foundMonth) {
        // while the date matches the current month, keep adding more weeks
        while (months[userInput.month()] === newMonth.month) {
          if (days[userInput.day()] !== 'Sunday') {
            userInput.day(0);
          }
          let weekObj = {
            weekdate: userInput.date(),
            month: months[userInput.month()],
            year: userInput.year(),
            days: [],
            habits: []
          };

          for (let i = 0; i < 7; i++) {
            let dayObj = {
              month: months[userInput.day(i).month()],
              year: userInput.day(i).year(),
              weekday: days[userInput.day(i).day()],
              weekdate: userInput.day(i).date(),
            };
            weekObj.days.push(dayObj);
          };
          req.body.habitList.forEach(function(habit) {
            weekObj.habits.push({content: habit});
          });

          foundMonth.weeks.push(weekObj);
          userInput.day(7);
        };
        // save the month with new data in subarrays
        foundMonth.save(function(err) {
          res.redirect("/months");
        });
      });
    }
  });
}

// show - show details of the month - main component of the app
function show(req, res) {
  Month.findById(req.params.id, (err, foundMonth) => {
    res.render("months/show", {
      month: foundMonth,
      days: foundMonth.days,
      goals: foundMonth.goals,
      habits: foundMonth.habits,
      title: `${foundMonth.month} ${foundMonth.year}`
    });
  });
}

// delete - delete one month 
function deleteMonth(req, res) {
  Month.deleteOne({ _id: req.params.id }, function(err) {
    res.redirect("/months");
  })
}

// edit - get user input to edit one month
function edit(req, res) {
  Month.find({}, function(err, months) {
    months.forEach(function(month) {
      if (month._id == req.params.id) {
        res.render("months/edit", {
          months,
          editMonth: month,
          title: 'Edit Month'
        });
      }
    });
  });
}

// put/update - update month with information from user
function update(req, res) {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Month.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateModel) => {
      if (err) {
      } else {
        res.redirect("/months");
      }
    }
    );
  }

  module.exports = {
    index,
    new: newMonth,
    create,
    show,
    delete: deleteMonth,
    edit,
    update,
  }
  