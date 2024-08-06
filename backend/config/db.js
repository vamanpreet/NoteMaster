const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.mongoURL;

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(() => console.log('Connected Successfully To Database'))
    .catch(error => console.log('Failed to connect', error))
}

module.exports = connectToMongo;