const express = require('express');
const router = express.Router();
const { getComment, createComment } = require('../app/controllers/comment');

router.get('/:id', getComment);
router.post('/create', createComment);

module.exports = router;
