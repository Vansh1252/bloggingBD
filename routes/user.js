const express = require('express');
const router = express.Router();
const save = require('../controllers/users/save');
const login = require('../controllers/users/login');
const getone = require('../controllers/users/getone');
const deleted = require('../controllers/users/delete');
const helpertoken = require('../utilities/tokenauthentication');

router.post('/signup', save);
router.post('/login', login);
router.get('/', helpertoken, getone);
router.post('/delete', helpertoken, deleted);

module.exports = router;
