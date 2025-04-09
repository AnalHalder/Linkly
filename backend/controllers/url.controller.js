const shortid = require('shortid');
const URL = require('../models/url.model')

async function generateURLshortID(req, res) {
    const body = req.body;
    if (!body.URL) return res.status(400).json({ error: "url required" });
  
    const shortId = shortid(10);
    await URL.create({
        shortId: shortId,
        redirectURL: body.URL,
    })
    return res.json(shortId);
}

async function redirectShortURL(req, res) {
    const shortId = req.params.shortId
    const entry = await URL.findOne(shortId)
    res.redirect(entry.redirectURL);
}


module.exports = {
    generateURLshortID,
    redirectShortURL,
}