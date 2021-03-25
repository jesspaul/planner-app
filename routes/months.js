const express = require('express');
const router = express.Router();
const monthsCtrl = require('../controllers/months');
const monthGoalsCtrl = require('../controllers/monthgoals');

router.get('/', monthsCtrl.index);
router.get('/new', monthsCtrl.new);
router.post('/', monthsCtrl.create);
router.delete('/:id', monthsCtrl.delete);
router.get('/:id/edit', monthsCtrl.edit);
router.put('/:id', monthsCtrl.update);
router.get('/:id', monthsCtrl.show);

// goals
router.get('/:monthId/goals/new', monthGoalsCtrl.new);
router.post('/:monthId/goals', monthGoalsCtrl.create);
router.get('/:monthId/goals/:goalId/edit', monthGoalsCtrl.edit);
router.put('/:monthId/goals/:goalId', monthGoalsCtrl.update);
router.delete('/:monthId/goals/:goalId', monthGoalsCtrl.delete);

module.exports = router;