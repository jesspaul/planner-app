const express = require('express');
const router = express.Router();
const entriesCtrl = require('../controllers/entries');

router.get('/months/:monthId/weeks/:weekId/days/:dayId/entries/new', entriesCtrl.new);
router.post('/months/:monthId/weeks/:weekId/days/:dayId/entries', entriesCtrl.create);
router.delete('/months/:monthId/weeks/:weekId/days/:dayId/entries/:entryId', entriesCtrl.delete);
router.get('/months/:monthId/weeks/:weekId/days/:dayId/entries/:entryId/edit', entriesCtrl.edit);
router.put('/months/:monthId/weeks/:weekId/days/:dayId/entries/:entryId', entriesCtrl.update);

module.exports = router;