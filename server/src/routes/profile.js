const express = require('express');
const router = express.Router();
const { getData } = require('../app/controllers/about');

router.get('/about', getData);

module.exports = router;
