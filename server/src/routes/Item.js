const express = require('express');
const router = express.Router();
const { getItem, getItemByCategory } = require('../app/controllers/itemController');

router.get('/', getItem);
router.get('/cate', getItemByCategory);

module.exports = router;
