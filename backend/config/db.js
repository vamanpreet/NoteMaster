const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = 'mongodb+srv://vamanpreet2110:vamanpreet60@cluster0.652l5.mongodb.net/NoteMaster?';

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(() => console.log('Connected Successfully To Database'))
    .catch(error => console.log('Failed to connect', error))
}

module.exports = connectToMongo;