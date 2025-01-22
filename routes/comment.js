const express = require('express');
const router = express.Router();
const save = require('../controllers/comments/save');
const getone = require('../controllers/comments/getone');
const deleted = require('../controllers/users/delete');
const helpertoken = require('../utilities/tokenauthentication');

router.post('/', helpertoken, save);
router.get('/', helpertoken, getone);
router.post('/delete', helpertoken, deleted);

module.exports = router;
