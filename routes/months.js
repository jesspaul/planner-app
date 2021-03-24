const express = require('express');
const router = express.Router();
const monthsCtrl = require('../controllers/months');

router.get('/', monthsCtrl.index);
router.get('/new', monthsCtrl.new);
router.post('/', monthsCtrl.create);
router.delete('/:id', monthsCtrl.delete);
router.get('/:id/edit', monthsCtrl.edit);
router.put('/:id', monthsCtrl.update);
router.get('/:id', monthsCtrl.show);

module.exports = router;