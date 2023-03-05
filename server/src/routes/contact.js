const express = require('express');
const router = express.Router();
const { sendContact } = require('../app/controllers/contact');

router.post('/send', sendContact);

module.exports = router;
