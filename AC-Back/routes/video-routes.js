const express = require('express');
const router = express.Router();
const Video = require('../models/videos-model')

//This API route will return an element in db based on the current time
router.get('/current-video/:time', async (req, res) => {

    const currentTime = req.params.time;

    const video = await Video.findOne({
        time: currentTime
    });

    if(!video) {
        res.status(500).send("No video");
    }

    res.status(200).json(video);
});

module.exports = router;