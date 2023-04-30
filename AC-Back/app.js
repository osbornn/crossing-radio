require('dotenv').config({path: './ac-back-db.env'});
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const app = express();

const db_uri = process.env.RADIOCROSSING_DB;
console.log(db_uri);

const videoRoutes = require('./routes/video-routes');

mongoose.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to Crossing Radio!!");
    })
    .catch((error) => {
        console.error(error.message);
    });

app.use(cors());
app.use('/api', videoRoutes);

//Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}"`);
}); 