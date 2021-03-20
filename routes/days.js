const express = require('express');
const router = express.Router();
const daysCtrl = require('../controllers/days');

router.get('/days/:id/entries/new', daysCtrl.new);
router.post('/days/:id/entries', daysCtrl.create);
// router.delete('/:id', daysCtrl.delete);
// router.get('/:id/edit', daysCtrl.edit);
// router.put('/:id', daysCtrl.update);
// router.get('/:id', daysCtrl.show);

module.exports = router;