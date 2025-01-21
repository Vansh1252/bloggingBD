const express = require('express');
const router = express.Router();
const save = require('../controllers/articles/save');
const getone = require('../controllers/articles/getone');
const edit = require('../controllers/articles/edit');
const deleted = require('../controllers/articles/delete');
const helpertoken = require('../utilities/tokenauthentication');

router.post('/save', helpertoken, save);
router.get('/', helpertoken, getone.getonewithoutpaginaction);
router.post('/active', helpertoken, getone.getonewithpaginaction);
router.post('/delete', helpertoken, deleted);
router.post('/edit', helpertoken, edit);

module.exports = router;
