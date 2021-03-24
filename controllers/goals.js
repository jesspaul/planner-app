const { set } = require("mongoose");
const Month = require("../models/month.js");

function newGoal(req, res) {
    res.render('goals/new', {
      monthId: req.params.monthId,
      weekId: req.params.weekId,
      title: 'New Goal'
    });
  }

  function create(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      const foundWeek = foundMonth.weeks.id(req.params.weekId);
      
      foundWeek.goals.push(req.body);
  
      foundMonth.save(function(err, savedMonth) {
        res.redirect(`/months/${savedMonth._id}/weeks/${req.params.weekId}`);
      });
    });
  }

  function edit(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      res.render('goals/edit', {
        monthId: req.params.monthId,
        weekId: req.params.weekId,
        goalId: req.params.goalId,
        editGoal: foundMonth.weeks.id(req.params.weekId).goals.id(req.params.goalId),
        title: 'Edit Goal'
      });
    });
  }

  function update(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      editGoal = foundMonth.weeks.id(req.params.weekId).goals.id(req.params.goalId)  
      editGoal.set(req.body);
  
      foundMonth.save(function(err, savedMonth) {
        res.redirect(`/months/${savedMonth._id}/weeks/${req.params.weekId}`);
      });
    });
  }

  function deleteGoal(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      foundMonth.weeks.id(req.params.weekId).goals.pull(req.params.goalId);
  
      foundMonth.save(function(err, savedMonth) {
        res.redirect(`/months/${savedMonth._id}/weeks/${req.params.weekId}`);
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
  