const mongoose = require('mongoose');
const Video = require('./models/videos-model');

const AcVideosArray = [
    {
        title: "Animal Crossing 12AM",
        time: 0,
        url: 'https://youtu.be/qDnrdeNDRio?si=Fy2dez_sJSqifyUh'
    },
    {
        title: "Animal Crossing 1AM",
        time: 1,
        url: 'https://youtu.be/LjrMm_6zmNo?si=xUIchjEZozx4lulJ'
    },
    {
        title: "Animal Crossing 2AM",
        time: 2,
        url: 'https://youtu.be/oPCkJqbTpaA?si=Zr4Y-_FZBNzygKzn'        
    },
    {
        title: "Animal Crossing 3AM",
        time: 3,
        url: 'https://youtu.be/0Gpa29MRPys?si=kckp1ZZ_Gi4t8E1f'
    }, 
    {
        title: "Animal Crossing 4AM",
        time: 4,
        url: 'https://youtu.be/ROpWMf0Md6g?si=PRyhDksZDEpmOV1O'
    },
    {
        title: "Animal Crossing 5AM",
        time: 5,
        url: 'https://youtu.be/_qSyWo0Tm4U?si=DkSNRZBvLK1E9ehp'
    },
    {
        title: "Animal Crossing 6AM",
        time: 6,
        url: 'https://youtu.be/lS0XGL2rWTI?si=8kALDizrSdJQt5aw'
    },
    {
        title: "Animal Crossing 7AM",
        time: 7,
        url: 'https://youtu.be/rdVBS1lHDC4?si=9VH9Xllz25T8FpPi'
    },
    {
        title: "Animal Crossing 8AM",
        time: 8,
        url: 'https://youtu.be/QIx22FB3FXo?si=xWZgnGgRsvviPZv3'
    },
    {
        title: "Animal Crossing 9AM",
        time: 9,
        url: 'https://youtu.be/7Rf6gOt_LdY?si=XVbOOgNyfz1qdC4H'
    },
    {
        title: "Animal Crossing 10AM",
        time: 10,
        url: 'https://youtu.be/hkP1kOKF2Yk?si=LblfgaJ5ingihpMz'
    },
    {
        title: "Animal Crossing 11AM",
        time: 11,
        url: 'https://youtu.be/AKXMNP23BnA?si=2XVFIRBF7t8E8R_-'
    },
    {
        title: "Animal Crossing 12PM",
        time: 12,
        url: 'https://youtu.be/KJp488yN3VM?si=qr5Hn8c12SHkTWmv'
    },
    {
        title: "Animal Crossing 1PM",
        time: 13,
        url: 'https://youtu.be/yWWoDrUZq04?si=V4pjpOTKznjYp93f'
    },
    {
        title: "Animal Crossing 2PM",
        time: 14,
        url: 'https://youtu.be/gD4Hh115gOk?si=YImcj2j4TEwO7USe'
    },
    {
        title: "Animal Crossing 3PM",
        time: 15,
        url: 'https://youtu.be/uhnNzw4x7sE?si=SDaIW0Iv15XvYF3i'
    },
    {
        title: "Animal Crossing 4PM",
        time: 16,
        url: 'https://youtu.be/cLBhI_9njKw?si=g8amkM4yq1iPN4CF'
    },
    {
        title: "Animal Crossing 5PM",
        time: 17,
        url: 'https://youtu.be/vc1zlXMyZow?si=k_4LPl0pGWblTOI4'
    },
    {
        title: "Animal Crossing 6PM",
        time: 18,
        url: 'https://youtu.be/WH_rj-YzzXI?si=eR9CnpjUZKi2IFCD'
    },
    {
        title: "Animal Crossing 7PM",
        time: 19,
        url: 'https://youtu.be/AK5mUK5IQvs?si=2dQ3dw10VRLAXd35'
    },
    {
        title: "Animal Crossing 8PM",
        time: 20,
        url: 'https://youtu.be/du10VZTTZp8?si=boaKfZ5GSVmnaJTq'
    }, 
    {
        title: "Animal Crossing 9PM",
        time: 21,
        url: 'https://youtu.be/HxXOrY_DtVw?si=vyQTDUt2TD5i_TjO'
    },
    {
        title: "Animal Crossing 10PM",
        time: 22,
        url: 'https://youtu.be/zANebE1wNjw?si=PZxM8vGF4aRp5p8o'
    },
    {
        title: "Animal Crossing 11PM",
        time: 23,
        url: 'https://youtu.be/5hVFsARLcV0?si=HWxnyq4m6vlpCOJT'
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