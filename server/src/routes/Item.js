const express = require('express');
const router = express.Router();
const { getItem, getItemByCategory, addUserLiked, getItemById } = require('../app/controllers/itemController');

router.get('/', getItem);
router.get('/get/:id', getItemById);
router.get('/cate', getItemByCategory);
router.post('/edit', addUserLiked);

module.exports = router;
