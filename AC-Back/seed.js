const mongoose = require('mongoose');
const Video = require('./models/videos-model');
const connection = require('./app');

const AcVideosArray = [
    {
        title: "Animal Crossing 12AM",
        time: 0,
        url: 'https://youtu.be/n8RDjtCuszE'
    },
    {
        title: "Animal Crossing 1AM",
        time: 1,
        url: 'https://youtu.be/5t_aJNkaY7A'
    },
    {
        title: "Animal Crossing 2AM",
        time: 2,
        url: 'https://youtu.be/pjkU43JEgNc'        
    },
    {
        title: "Animal Crossing 3AM",
        time: 3,
        url: 'https://youtu.be/0QyqxpDGakY'
    }, 
    {
        title: "Animal Crossing 4AM",
        time: 4,
        url: 'https://youtu.be/lYmqfE9m_kM'
    },
    {
        title: "Animal Crossing 5AM",
        time: 5,
        url: 'https://youtu.be/GmS4_ss2Dwo'
    },
    {
        title: "Animal Crossing 6AM",
        time: 6,
        url: 'https://youtu.be/F48VgfseCCQ'
    },
    {
        title: "Animal Crossing 7AM",
        time: 7,
        url: 'https://youtu.be/ep63TehgDOI'
    },
    {
        title: "Animal Crossing 8AM",
        time: 8,
        url: 'https://youtu.be/R61xfLo9wb8'
    },
    {
        title: "Animal Crossing 9AM",
        time: 9,
        url: 'https://youtu.be/MHTKRw6qp2k'
    },
    {
        title: "Animal Crossing 10AM",
        time: 10,
        url: 'https://youtu.be/yLe0KI8FOHY'
    },
    {
        title: "Animal Crossing 11AM",
        time: 11,
        url: 'https://youtu.be/qjyFUU3s0AU'
    },
    {
        title: "Animal Crossing 12AM",
        time: 12,
        url: 'https://youtu.be/8uj32PVlH60'
    },
    {
        title: "Animal Crossing 1PM",
        time: 13,
        url: 'https://youtu.be/AyqUZlxKKNw'
    },
    {
        title: "Animal Crossing 2PM",
        time: 14,
        url: 'https://youtu.be/h454NrwLFHY'
    },
    {
        title: "Animal Crossing 3PM",
        time: 15,
        url: 'https://youtu.be/8wN7Mu5sQZs'
    },
    {
        title: "Animal Crossing 4PM",
        time: 16,
        url: 'https://youtu.be/cvQGK9HweVo'
    },
    {
        title: "Animal Crossing 5PM",
        time: 17,
        url: 'https://youtu.be/S5iX6REcvPs'
    },
    {
        title: "Animal Crossing 6PM",
        time: 18,
        url: 'https://youtu.be/I2Uk8zMouTk'
    },
    {
        title: "Animal Crossing 7PM",
        time: 19,
        url: 'https://youtu.be/_iTWC3ZsrSc'
    },
    {
        title: "Animal Crossing 8PM",
        time: 20,
        url: 'https://youtu.be/p0lZHEjHsg8'
    }, 
    {
        title: "Animal Crossing 9PM",
        time: 21,
        url: 'https://youtu.be/996XAXUc5KU'
    },
    {
        title: "Animal Crossing 10PM",
        time: 22,
        url: 'https://youtu.be/h_U9RpaheTA'
    },
    {
        title: "Animal Crossing 11PM",
        time: 23,
        url: 'https://youtu.be/HqoNP3ez6Mw'
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