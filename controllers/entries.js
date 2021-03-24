const { set } = require("mongoose");
const Month = require("../models/month.js");

// NEW
function newEntry(req, res) {
  res.render("entries/new", {
    monthId: req.params.monthId,
    weekId: req.params.weekId,
    dayId: req.params.dayId,
    title: 'New Entry'
  });
}

// CREATE
function create(req, res) {
  Month.findById(req.params.monthId, function(err, foundMonth) {
    const foundDay = foundMonth.weeks.id(req.params.weekId).days.id(req.params.dayId);

    let entryObj = {
      content: req.body.content,
      category: req.body.category
    }
    foundDay.entries.push(entryObj);

    foundMonth.save(function(err, savedMonth) {
      res.redirect(`/months/${savedMonth._id}/weeks/${req.params.weekId}`);
    });
  });
}

// DELETE
function deleteEntry(req, res) {
  Month.findById(req.params.monthId, function(err, foundMonth) {
    foundMonth.weeks.id(req.params.weekId).days.id(req.params.dayId).entries.pull(req.params.entryId);

    foundMonth.save(function(err, savedMonth) {
      res.redirect(`/months/${savedMonth._id}/weeks/${req.params.weekId}`);
    });
  });
}
            
// EDIT
function edit(req, res) {
  Month.findById(req.params.monthId, function(err, foundMonth) {
    res.render('entries/edit', {
      monthId: req.params.monthId,
      weekId: req.params.weekId,
      dayId: req.params.dayId,
      entryId: req.params.entryId,
      editEntry: foundMonth.weeks.id(req.params.weekId).days.id(req.params.dayId).entries.id(req.params.entryId),
      title: 'Edit Entry'
    });
  });
}

// PUT/UPDATE
function update(req, res) {
  Month.findById(req.params.monthId, function(err, foundMonth) {
    editEntry = foundMonth.weeks.id(req.params.weekId).days.id(req.params.dayId).entries.id(req.params.entryId)  
    editEntry.set(req.body);

    foundMonth.save(function(err, savedMonth) {
      res.redirect(`/months/${savedMonth._id}/weeks/${req.params.weekId}`);
    });
  });
}
  
module.exports = {
  new: newEntry,
  create,
  delete: deleteEntry,
  edit,
  update
}
  