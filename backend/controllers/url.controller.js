const shortid = require('shortid');
const URL = require('../models/url.model')

async function handleGenerateURLshortId(req, res) {
    const body = req.body;
    if (!body.URL) return res.status(400).json({ error: "url required" });
    if (!body.URL.startsWith('https://') || !body.URL.startsWith('http://')) {
        body.URL = 'https://' + body.URL;
    }
    const shortId = shortid(10);
    await URL.create({
        shortId: shortId,
        redirectURL: body.URL,
        visitedHistory: [],
    })
    return res.json(shortId);
}

async function handleRedirectURL(req, res) {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitedHistory: { timestamp: Date.now() }
            }
        }
    )
    res.redirect(entry.redirectURL);
}

async function handleAnalyticsOfURL(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if(!result) return res.json({error:"url is not valid"})
    
    return  res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory
    })
}

module.exports = {
    handleGenerateURLshortId,
    handleRedirectURL,
    handleAnalyticsOfURL
}