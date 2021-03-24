const express = require('express');
const router = express.Router();
const weeksCtrl = require('../controllers/weeks');
const goalsCtrl = require('../controllers/goals');
const habitsCtrl = require('../controllers/habits');

router.get('/months/:monthId/weeks/:weekId', weeksCtrl.show);

// goals
router.get('/weeks/:weekId/goals/new', goalsCtrl.new);
router.post('/weeks/:weekId/goals', goalsCtrl.create);
router.get('/weeks/:weekId/goals/:goalId/edit', goalsCtrl.edit);
router.put('/weeks/:weekId/goals/:goalId', goalsCtrl.update);
router.delete('/weeks/:weekId/goals/:goalId', goalsCtrl.delete);

// habits
router.get('/weeks/:weekId/habits/new', habitsCtrl.new);
router.post('/weeks/:weekId/habits', habitsCtrl.create);
router.get('/weeks/:weekId/habits/:habitId/edit', habitsCtrl.edit);
router.put('/weeks/:weekId/habits/:habitId', habitsCtrl.update);
router.delete('/weeks/:weekId/habits/:habitId', habitsCtrl.delete);

module.exports = router;