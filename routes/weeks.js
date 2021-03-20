const express = require('express');
const router = express.Router();
const weeksCtrl = require('../controllers/weeks');

router.get('/', weeksCtrl.index);
router.get('/new', weeksCtrl.new);
router.post('/', weeksCtrl.create);
router.delete('/:id', weeksCtrl.delete);
router.get('/:id/edit', weeksCtrl.edit);
router.put('/:id', weeksCtrl.update);
router.get('/:id', weeksCtrl.show);
router.get('/:id/goals/new', weeksCtrl.newGoal);
router.post('/:id/goals', weeksCtrl.createGoal);
router.get('/:id/goals/:goalId/edit', weeksCtrl.editGoal);
router.put('/id/goals/:goalId', weeksCtrl.updateGoal);

module.exports = router;