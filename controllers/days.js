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
  console.log(`DELETE FUNCTION: day id is ${req.params.dayId}`);
  console.log(`DELETE FUNCTION: entry id is ${req.params.entryId}`);
  
  Week.find({}, function(err, weeks) {
    weeks.forEach(function(week) {
      week.days.forEach(function(day) {
        day.entries.forEach(function(entry) {
          if (entry._id == req.params.entryId) {
            let entryIdx = day.entries.indexOf(entry._id);
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

  // Week.findById(req.params.id, (err, foundWeek) => {
  //   res.render("edit.ejs", {
  //     week: foundWeek
  //   });
  // });
}

// // PUT/UPDATE
// function update(req, res) {
//   if (req.body.readyToEat === "on") {
//     req.body.readyToEat = true;
//   } else {
//     req.body.readyToEat = false;
//   }
//   // res.send(req.body)
//   Week.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, updateModel) => {
//       if (err) {
//       } else {
//         // res.send(updateModel);
//         res.redirect("/weeks");
//       }
//     }
//     );
//   }
  
  module.exports = {
    new: newEntry,
    create,
    delete: deleteEntry,
    edit,
    // update
  }
  