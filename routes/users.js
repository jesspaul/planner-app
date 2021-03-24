const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');


router.get('/new', usersCtrl.new);
router.post('/signup', usersCtrl.signUp);
router.get('/signin', usersCtrl.signIn);
router.post('/login', usersCtrl.login);
router.get('/weeks', usersCtrl.weeks);
router.get('/logout', usersCtrl.logout);

module.exports = router;