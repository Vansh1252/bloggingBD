const express = require('express');
const router = express.Router();
const save = require('../controllers/likes/save');
const deleted = require('../controllers/likes/delete');
const getone = require('../controllers/likes/getone');

router.post('/', save);
router.get('/', getone);
router.post('/delete', deleted)


module.exports = router;