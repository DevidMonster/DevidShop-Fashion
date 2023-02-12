const express = require('express');
const router = express.Router();
const { getUserById, getUser, userLogin } = require('../app/controllers/general');

router.get('/user', getUser);
router.get('/user/get/:id', getUserById);
router.post('/user/login', userLogin);

module.exports = router;
