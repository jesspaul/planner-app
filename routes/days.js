const express = require('express');
const router = express.Router();
const daysCtrl = require('../controllers/days');

router.get('/:id/entries/new', daysCtrl.new);
router.post('/:id/entries', daysCtrl.create);
router.delete('/:dayId/entries/:entryId', daysCtrl.delete);
router.get('/:dayId/entries/:entryId/edit', daysCtrl.edit);
// router.put('/:id', daysCtrl.update);
// router.get('/:id', daysCtrl.show);

module.exports = router;