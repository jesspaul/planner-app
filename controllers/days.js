const { set } = require("mongoose");
const Week = require("../models/week.js");

// NEW
function newEntry(req, res) {
  res.render("entries/new.ejs", {
    weekId: req.params.weekId,
    dayId: req.params.dayId,
    title: 'New Entry'
  });
}

// CREATE
function create(req, res) {
  Week.find({}, function(err, weeks) {
    weeks.forEach(function(week) {
      week.days.forEach(function(day) {
        if (day._id == req.params.dayId) {
          let entryObj = {
            content: req.body.content,
            category: req.body.category
          }
          day.entries.push(entryObj);
          week.save(function(err, savedWeek) {
            res.redirect(`/weeks/${savedWeek._id}`);
          });
        };
      });
    })
  });
}

// DELETE
function deleteEntry(req, res) {
  Week.find({}, function(err, weeks) {
    weeks.forEach(function(week) {
      week.days.forEach(function(day) {
        day.entries.forEach(function(entry) {
          if (entry._id == req.params.entryId) {
            let entryIdx = day.entries.indexOf(entry);
            day.entries.splice(entryIdx, 1);
            week.save(function(err) {
              res.redirect(`/weeks/${week._id}`);
            });
          };
        });
      });
    });
  });
}
            
// EDIT
function edit(req, res) {
  res.render('entries/edit.ejs', {
    weekId: req.params.weekId,
    dayId: req.params.dayId,
    entryId: req.params.entryId,
    title: 'Edit Entry'
  });
}

// PUT/UPDATE
function update(req, res) {
  let updatedEntry = {
    content: req.body.content,
    category: req.body.category
  };

  Week.find({}, function(err, weeks) {
    weeks.forEach(function(week) {
      week.days.forEach(function(day) {
        day.entries.forEach(function(entry) {
          if (entry._id == req.params.entryId) {
            let entryIdx = day.entries.indexOf(entry);
            day.entries.splice(entryIdx, 1, updatedEntry);
            week.save(function(err) {
              res.redirect(`/weeks/${week._id}`);
            });
          };
        });
      });
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
  