const { set } = require("mongoose");
const Month = require("../models/month.js");

function newHabit(req, res) {
    res.render('habits/new', {
      monthId: req.params.monthId,
      weekId: req.params.weekId,
      title: 'New Habit'
    });
  }

  function create(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      const foundWeek = foundMonth.weeks.id(req.params.weekId);
      
      foundWeek.habits.push(req.body);
  
      foundMonth.save(function(err, savedMonth) {
        res.redirect(`/months/${savedMonth._id}/weeks/${req.params.weekId}`);
      });
    });
  }

  function edit(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      res.render('habits/edit', {
        monthId: req.params.monthId,
        weekId: req.params.weekId,
        habitId: req.params.habitId,
        editHabit: foundMonth.weeks.id(req.params.weekId).habits.id(req.params.habitId),
        title: 'Edit Habit'
      });
    });
  }

  function update(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      editHabit = foundMonth.weeks.id(req.params.weekId).habits.id(req.params.habitId);
      if (req.body.content) {
        editHabit.set(req.body);
      }
  
      let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      days.forEach(function(day) {
        let completeDay = day + 'Complete'
        if (req.body[completeDay] === 'on') {
          editHabit[completeDay] = true;
        } else if (req.body.day === day) {
          editHabit[completeDay] = false;
        }
      });

      foundMonth.save(function(err, savedMonth) {
        res.redirect(`/months/${savedMonth._id}/weeks/${req.params.weekId}`);
      });
    });
  }

  function deleteHabit(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      foundMonth.weeks.id(req.params.weekId).habits.pull(req.params.habitId);
  
      foundMonth.save(function(err, savedMonth) {
        res.redirect(`/months/${savedMonth._id}/weeks/${req.params.weekId}`);
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
  