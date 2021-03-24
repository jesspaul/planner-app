const express = require('express');
const router = express.Router();
const entriesCtrl = require('../controllers/entries');

router.get('/weeks/:weekId/days/:dayId/entries/new', entriesCtrl.new);
router.post('/weeks/:weekId/days/:dayId/entries', entriesCtrl.create);
router.delete('/weeks/:weekId/days/:dayId/entries/:entryId', entriesCtrl.delete);
router.get('/weeks/:weekId/days/:dayId/entries/:entryId/edit', entriesCtrl.edit);
router.put('/weeks/:weekId/days/:dayId/entries/:entryId', entriesCtrl.update);

module.exports = router;