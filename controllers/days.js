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
  console.log(req.params.id);
  Week.find({}, function(err, weeks) {
    weeks.forEach(function(week) {
      week.days.forEach(function(day) {
        if (day._id == req.params.id) {
          console.log(`this day matches with id ${day._id} and it is ${day.weekday} ${day.weekdate}`);
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

// // DELETE
// function deleteWeek(req, res) {
//   // res.send('deleting...')
//   Week.deleteOne({ _id: req.params.id }, function(err) {
//     res.redirect("/weeks");
//   })
// }

// // EDIT
// function edit(req, res) {
//   Week.findById(req.params.id, (err, foundWeek) => {
//     res.render("edit.ejs", {
//       week: foundWeek
//     });
//   });
// }

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
    // delete: deleteWeek,
    // edit,
    // update
  }
  