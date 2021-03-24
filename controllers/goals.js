const { set } = require("mongoose");
const Week = require("../models/week.js");

function newGoal(req, res) {
    res.render('goals/new.ejs', {
      weekId: req.params.id,
      title: 'New Goal'
    });
  }

  function create(req, res) {
    Week.findById(req.params.id, function(err, foundWeek) {
      foundWeek.goals.push(req.body);
      foundWeek.save(function(err) {
        res.redirect(`/weeks/${foundWeek._id}`);
      });
    });
  }

  function edit(req, res) {
    Week.findById(req.params.id, (err, foundWeek) => {
      res.render("goals/edit.ejs", {
        week: foundWeek,
        goalId: req.params.goalId,
        editGoal: foundWeek.goals.id(req.params.goalId),
        title: 'Edit Goal'
      });
    });
  }

  function update(req, res) {
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

  function deleteGoal(req, res) {
    Week.findById(req.params.id, function(err, foundWeek) {
      foundWeek.goals.forEach(function(goal) {
        if (goal._id == req.params.goalId) {
          let goalIdx = foundWeek.goals.indexOf(goal);
          foundWeek.goals.splice(goalIdx, 1);
        }
      });

      foundWeek.save(function(err) {
        res.redirect(`/weeks/${foundWeek._id}`);
      });
    });
  }
  
  module.exports = {
    new: newGoal,
    create,
    edit,
    update,
    delete: deleteGoal,
  }
  