const mongoose = require('mongoose');
const Video = require('../models/videos-model');
const connection = require('../app');

const AcVideosArray = [
    {
        title: "Animal Crossing 4PM",
        time: 4,
        url: 'https://youtu.be/cvQGK9HweVo'
    }
];

Video.insertMany(AcVideosArray).then(() => {
    console.log("Succesfully inserted videos");
    mongoose.connection.close();
})
.catch((error) => {
    console.error(error.message);
    mongoose.connection.close();
})