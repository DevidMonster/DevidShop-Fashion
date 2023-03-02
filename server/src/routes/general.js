const express = require('express');
const router = express.Router();
const { getUserById, getUser, userLogin, userRegister, removeUser, updateImage } = require('../app/controllers/general');

router.get('/user', getUser);
router.get('/user/get/:id', getUserById);
router.post('/user/login', userLogin);
router.post('/user/signup', userRegister);
router.delete('/user/del/:id', removeUser);
router.put('/user/img', updateImage);

module.exports = router;
