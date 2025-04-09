const express = require('express');
const router = express.Router();

const {
    generateURLshortID,
    redirectShortURL,} = require('../controllers/url.controller')

router.post("/", generateURLshortID);
router.get("/:shortId", redirectShortURL);


module.exports = router;