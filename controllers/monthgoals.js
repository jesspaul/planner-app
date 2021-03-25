const { set } = require("mongoose");
const Month = require("../models/month.js");

function newGoal(req, res) {
    res.render('monthgoals/new', {
      monthId: req.params.monthId,
      title: 'New Goal'
    });
  }

  function create(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      foundMonth.goals.push(req.body);
  
      foundMonth.save(function(err, savedMonth) {
        res.redirect(`/months/${savedMonth._id}`);
      });
    });
  }

  function edit(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      res.render('monthgoals/edit', {
        monthId: req.params.monthId,
        goalId: req.params.goalId,
        editGoal: foundMonth.goals.id(req.params.goalId),
        title: 'Edit Goal'
      });
    });
  }

  function update(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      editGoal = foundMonth.goals.id(req.params.goalId)  
      editGoal.set(req.body);
  
      foundMonth.save(function(err, savedMonth) {
        res.redirect(`/months/${savedMonth._id}`);
      });
    });
  }

  function deleteGoal(req, res) {
    Month.findById(req.params.monthId, function(err, foundMonth) {
      foundMonth.goals.pull(req.params.goalId);
  
      foundMonth.save(function(err, savedMonth) {
        res.redirect(`/months/${savedMonth._id}`);
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
  