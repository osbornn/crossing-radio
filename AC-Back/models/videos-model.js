const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    time: { type: Number, required: true },
    url : { type: String, required: true }
});

const Video = mongoose.model('crossing-videos', VideoSchema);

module.exports = Video;