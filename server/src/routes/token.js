const express = require('express');
const router = express.Router();

router.get('/callback', (req, res) => {
    try {
        res.status(200).json({code: req.query.code})
    } catch(err) {
        res.status(404).json({message: err.message})
    }
});

module.exports = router;
