const { set } = require("mongoose");
const Week = require("../models/week.js");

// NEW
function newEntry(req, res) {
  res.render("days/new.ejs", {
    dayId: req.params.id
  });
}

// CREATE
function create(req, res) {
  Week.find({}, function(err, weeks) {
    weeks.forEach(function(week) {
      week.days.forEach(function(day) {
        if (day._id == req.params.id) {
          let entryObj = {
            content: req.body.content,
            category: req.body.category
          }
          day.entries.push(entryObj);
        };
      });
      week.save(function(err) {
        res.redirect("/weeks");
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
          };
        });
      });
      week.save(function(err) {
        res.redirect("/weeks");
      });
    });
  });
}
            
// EDIT
function edit(req, res) {
  console.log(`EDIT FUNCTION: day id is ${req.params.dayId}`);
  console.log(`EDIT FUNCTION: entry id is ${req.params.entryId}`);

  res.render('days/edit.ejs', {
    dayId: req.params.dayId,
    entryId: req.params.entryId
  });
}

// PUT/UPDATE
function update(req, res) {
  let updatedEntry = {
    content: req.body.content,
    category: req.body.category
  };
  console.log(updatedEntry);

  Week.find({}, function(err, weeks) {
    weeks.forEach(function(week) {
      week.days.forEach(function(day) {
        day.entries.forEach(function(entry) {
          if (entry._id == req.params.entryId) {

            let entryIdx = day.entries.indexOf(entry);
            day.entries.splice(entryIdx, 1, updatedEntry);
          };
        });
      });
      week.save(function(err) {
        res.redirect("/weeks");
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
  