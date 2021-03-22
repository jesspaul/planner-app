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
      res.render("habits/edit.ejs", {
        week: foundWeek,
        habitId: req.params.habitId,
        title: 'Edit Habit'
      });
    });
  }

  function update(req, res) {
    Week.findById(req.params.id, function(err, foundWeek) {
      foundWeek.habits.forEach(function(habit) {
        if (habit._id == req.params.habitId) {
          let habitIdx = foundWeek.habits.indexOf(habit);
          foundWeek.habits.splice(habitIdx, 1, req.body);
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
  