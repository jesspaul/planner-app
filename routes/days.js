const express = require('express');
const router = express.Router();
const daysCtrl = require('../controllers/days');

router.get('/weeks/:weekId/days/:dayId/entries/new', daysCtrl.new);
router.post('/weeks/:weekId/days/:dayId/entries', daysCtrl.create);
router.delete('/weeks/:weekId/days/:dayId/entries/:entryId', daysCtrl.delete);
router.get('/weeks/:weekId/days/:dayId/entries/:entryId/edit', daysCtrl.edit);
router.put('/weeks/:weekId/days/:dayId/entries/:entryId', daysCtrl.update);
// router.get('/:id', daysCtrl.show);

module.exports = router;