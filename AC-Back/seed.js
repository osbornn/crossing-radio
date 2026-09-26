require('dotenv').config({ path: './ac-back-db.env' });
const mongoose = require('mongoose');
const Video = require('./models/videos-model');

const db_uri = process.env.RADIOCROSSING_DB;

const AcVideosArray = [
    {
        title: "Animal Crossing 12AM",
        time: 0,
        url: 'https://youtu.be/4xP0X5NYhL8?si=gDyoYOmgvy7fqsfQ'
    },
    {
        title: "Animal Crossing 1AM",
        time: 1,
        url: 'https://youtu.be/hxL1G2yHiPw?si=_qAKSJNrQKwoiWj8'
    },
    {
        title: "Animal Crossing 2AM",
        time: 2,
        url: 'https://youtu.be/XTPz-U33DPw?si=-3KDg6Ak6pPqTFmS'        
    },
    {
        title: "Animal Crossing 3AM",
        time: 3,
        url: 'https://youtu.be/R3rvNeRD4f8?si=on6OwjgclKRiKP-r'
    }, 
    {
        title: "Animal Crossing 4AM",
        time: 4,
        url: 'https://youtu.be/F-Spddw5j6o?si=yHNzAoingKeEu0be'
    },
    {
        title: "Animal Crossing 5AM",
        time: 5,
        url: 'https://youtu.be/NujljIsUXqY?si=Ar3E9MBYsGpPDiOk'
    },
    {
        title: "Animal Crossing 6AM",
        time: 6,
        url: 'https://youtu.be/6KPzjcP6p-M?si=y07Hg_T12LmubT-f'
    },
    {
        title: "Animal Crossing 7AM",
        time: 7,
        url: 'https://youtu.be/cNogX2C8W6s?si=DSHw16SuR7SPkeb3'
    },
    {
        title: "Animal Crossing 8AM",
        time: 8,
        url: 'https://youtu.be/5Z_SnNunhdU?si=TMt3OCGfXImeeyme'
    },
    {
        title: "Animal Crossing 9AM",
        time: 9,
        url: 'https://youtu.be/5Vw1CPavbzw?si=qMtOWCYJqzIkOOIC'
    },
    {
        title: "Animal Crossing 10AM",
        time: 10,
        url: 'https://youtu.be/LyHnxpq8N8U?si=H9Xq1R2F8HtZsQZL'
    },
    {
        title: "Animal Crossing 11AM",
        time: 11,
        url: 'https://youtu.be/HRPut7_RkUk?si=6ZrCmtXrsSWMQfba'
    },
    {
        title: "Animal Crossing 12PM",
        time: 12,
        url: 'https://youtu.be/ao8LOPRsijw?si=slR3Vp_5MjmQQU-N'
    },
    {
        title: "Animal Crossing 1PM",
        time: 13,
        url: 'https://youtu.be/lqszVTQ5VZ8?si=kY4GL3RMCdXgy_vT'
    },
    {
        title: "Animal Crossing 2PM",
        time: 14,
        url: 'https://youtu.be/bOYatGNXdO4?si=O8kn6y2SJIAZvln6'
    },
    {
        title: "Animal Crossing 3PM",
        time: 15,
        url: 'https://youtu.be/PYd9oGbAZ28?si=9CmOt09j6jpHzmTM'
    },
    {
        title: "Animal Crossing 4PM",
        time: 16,
        url: 'https://youtu.be/1r2kqw4Up6o?si=QRmwAZILc2YLibog'
    },
    {
        title: "Animal Crossing 5PM",
        time: 17,
        url: 'https://youtu.be/4F59lA8c3lk?si=qKINcKNDuXjAXCll'
    },
    {
        title: "Animal Crossing 6PM",
        time: 18,
        url: 'https://youtu.be/q3ZlhPt50NE?si=yt7EvRFe-zbQ7IeP'
    },
    {
        title: "Animal Crossing 7PM",
        time: 19,
        url: 'https://youtu.be/d4YZ3itPEMg?si=mmradKxr-MzjtljC'
    },
    {
        title: "Animal Crossing 8PM",
        time: 20,
        url: 'https://youtu.be/3jGmbgm3guU?si=0TrKldZmntt8uWju'
    }, 
    {
        title: "Animal Crossing 9PM",
        time: 21,
        url: 'https://youtu.be/B_iRjkQSivQ?si=M4_xFYAE9-RnZgV2'
    },
    {
        title: "Animal Crossing 10PM",
        time: 22,
        url: 'https://youtu.be/l3cnPTbY764?si=X3e61pbj1b9DSCTW'
    },
    {
        title: "Animal Crossing 11PM",
        time: 23,
        url: 'https://youtu.be/5rcsf8wtI_Y?si=8tZVxEZHMCzC12Em'
    }
];

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => Video.insertMany(AcVideosArray))
  .then(() => {
    console.log("Successfully inserted videos");
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error(error);
    mongoose.connection.close();
  });