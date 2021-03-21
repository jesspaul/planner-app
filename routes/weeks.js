const express = require('express');
const router = express.Router();
const weeksCtrl = require('../controllers/weeks');
const goalsCtrl = require('../controllers/goals');
const habitsCtrl = require('../controllers/habits');

router.get('/', weeksCtrl.index);
router.get('/new', weeksCtrl.new);
router.post('/', weeksCtrl.create);
router.delete('/:id', weeksCtrl.delete);
router.get('/:id/edit', weeksCtrl.edit);
router.put('/:id', weeksCtrl.update);
router.get('/:id', weeksCtrl.show);

// goals
router.get('/:id/goals/new', goalsCtrl.new);
router.post('/:id/goals', goalsCtrl.create);
router.get('/:id/goals/:goalId/edit', goalsCtrl.edit);
router.put('/:id/goals/:goalId', goalsCtrl.update);
router.delete('/:id/goals/:goalId', goalsCtrl.delete);

// habits
router.get('/:id/habits/new', habitsCtrl.new);
router.post('/:id/habits', habitsCtrl.create);
router.get('/:id/habits/:habitId/edit', habitsCtrl.edit);
router.put('/:id/habits/:habitId', habitsCtrl.update);
router.delete('/:id/habits/:habitId', habitsCtrl.delete);

module.exports = router;