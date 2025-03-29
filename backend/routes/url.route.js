const express = require('express');
const router = express.Router();

const {
    handleGenerateURLshortId,
    handleRedirectURL,
    handleAnalyticsOfURL } = require('../controllers/url.controller')

router.post("/", handleGenerateURLshortId);
router.get("/:shortId", handleRedirectURL);
router.get("/analytics/:shortId",handleAnalyticsOfURL)



module.exports = router;