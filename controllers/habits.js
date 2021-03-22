const { set } = require("mongoose");
const Week = require("../models/week.js");

function newHabit(req, res) {
    res.render('habits/new.ejs', {
      weekId: req.params.id,
      title: 'New Habit'
    });
  }

  function create(req, res) {
    Week.findById(req.params.id, function(err, foundWeek) {
      foundWeek.habits.push(req.body);
      foundWeek.save(function(err) {
        res.redirect(`/weeks/${foundWeek._id}`);
      });
    });
  }

  function edit(req, res) {
    Week.findById(req.params.id, (err, foundWeek) => {
      let habitIdx;
      foundWeek.habits.forEach(function(habit) {
        if (habit._id == req.params.habitId) {
          habitIdx = foundWeek.habits.indexOf(habit);
        }
      })

      res.render("habits/edit.ejs", {
        week: foundWeek,
        editHabit: foundWeek.habits[habitIdx],
        title: 'Edit Habit'
      });
    });
  }

  function update(req, res) {
    Week.findById(req.params.id, function(err, foundWeek) {
      foundWeek.habits.forEach(function(habit) {
        if (habit._id == req.params.habitId) {
          if (req.body.content) {
            let habitIdx = foundWeek.habits.indexOf(habit);
            foundWeek.habits[habitIdx].content = req.body.content;
          }

          let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
          days.forEach(function(day) {
            let completeDay = day + 'Complete'
            if (req.body[completeDay]) {
              habit[completeDay] = true;
            }
          });
        }
      });

      foundWeek.save(function(err) {
        res.redirect(`/weeks/${foundWeek._id}`);
      });
    });
  }

  function deleteHabit(req, res) {
    Week.findById(req.params.id, function(err, foundWeek) {
      foundWeek.habits.forEach(function(habit) {
        if (habit._id == req.params.habitId) {
          let habitIdx = foundWeek.habits.indexOf(habit);
          foundWeek.habits.splice(habitIdx, 1);
        }
      });

      foundWeek.save(function(err) {
        res.redirect(`/weeks/${foundWeek._id}`);
      });
    });
  }
  
  module.exports = {
    new: newHabit,
    create,
    edit,
    update,
    delete: deleteHabit,
  }
  