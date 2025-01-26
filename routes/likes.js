const express = require('express');
const router = express.Router();
const save = require('../controllers/likes/save');
const deleted = require('../controllers/likes/delete');
const getone = require('../controllers/likes/getone');
const helpertoken = require('../utilities/tokenauthentication');

router.post('/', helpertoken, save);
router.get('/', helpertoken, getone);
router.post('/delete', helpertoken, deleted);


module.exports = router;