const { set } = require("mongoose");
const Week = require("../models/week.js");

// INDEX..aka SHOW ALL
function index(req, res) {
  Week.find({}, (error, weeks) => {
    // res.send(weeks);
    res.render("weeks/index.ejs", { weeks });
  });
}

// NEW
function newWeek(req, res) {
  res.render("weeks/new.ejs");
}

// CREATE
function create(req, res) {
  const dateInput = new Date(req.body.startDay);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  req.body.month = months[dateInput.getUTCMonth()];
  
  req.body.year = dateInput.getUTCFullYear();
  
  req.body.weekday = days[dateInput.getUTCDay()];

  req.body.weekdate = dateInput.getUTCDate();

  req.body.endDay = new Date(dateInput.setUTCDate(req.body.weekdate + 6)).toUTCString();

  Week.create(req.body, (error, newWeek) => {
    Week.findById(newWeek._id, function(err, foundWeek) {
      for (let i = 0; i < 7; i++) {
        let newDay = new Date(dateInput.setUTCDate(req.body.weekdate + i));
        let dayObj = {
          month: months[newDay.getUTCMonth()],
          year: newDay.getUTCFullYear(),
          weekday: days[newDay.getUTCDay()],
          weekdate: newDay.getUTCDate(),
        };
        foundWeek.days.push(dayObj);
      };
      foundWeek.save(function(err) {
        console.log(foundWeek.days);
        res.redirect("/weeks");
      });
    });
  });
}

// SHOW ONE
function show(req, res) {
  Week.findById(req.params.id, (err, foundWeek) => {
    res.render("weeks/show.ejs", {
      week: foundWeek,
      days: foundWeek.days,
      goals: foundWeek.goals,
    });
  });
}

// DELETE
function deleteWeek(req, res) {
  // res.send('deleting...')
  Week.deleteOne({ _id: req.params.id }, function(err) {
    res.redirect("/weeks");
  })
}

// EDIT
// /weeks/5e5a93cd12675b4c0efcb17e/edit
function edit(req, res) {
  Week.findById(req.params.id, (err, foundWeek) => {
    res.render("weeks/edit.ejs", {
      week: foundWeek
    });
  });
}

// PUT/UPDATE
function update(req, res) {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  // res.send(req.body)
  Week.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateModel) => {
      if (err) {
      } else {
        // res.send(updateModel);
        res.redirect("/weeks");
      }
    }
    );
  }

  function newGoal(req, res) {
    res.render('weeks/newgoal.ejs', {
      weekId: req.params.id
    });
  }

  function createGoal(req, res) {
    Week.findById(req.params.id, function(err, foundWeek) {
      foundWeek.goals.push(req.body);
      foundWeek.save(function(err) {
        res.redirect(`/weeks/${foundWeek._id}`);
      });
    });
  }

  function editGoal(req, res) {
    Week.findById(req.params.id, (err, foundWeek) => {
      res.render("weeks/editgoal.ejs", {
        week: foundWeek
      });
    });
  }

  function updateGoal(req, res) {
    Week.findById(req.params.id, function(err, foundWeek) {
      foundWeek.goals.forEach(function(goal) {
        if (goal._id == req.params.goalId) {
          let goalIdx = foundWeek.goals.indexOf(goal);
          foundWeek.goals.splice(goalIdx, 1, req.body);
        }
      });

      foundWeek.save(function(err) {
        res.redirect(`/weeks/${foundWeek._id}`);
      });
    });
  }
  
  module.exports = {
    index,
    new: newWeek,
    create,
    show,
    delete: deleteWeek,
    edit,
    update,
    newGoal,
    createGoal,
    editGoal,
    updateGoal,
  }
  