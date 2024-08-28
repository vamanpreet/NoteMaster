const mongoose = require('mongoose');
require('dotenv').config(); // Ensure environment variables are loaded

const mongoURI = process.env.mongoURI;

const connectToMongo = () => {
    if (!mongoURI) {
        console.error('MongoDB URI is not defined');
        process.exit(1);
    }

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected Successfully To Database'))
    .catch(error => {
        console.error('Failed to connect', error);
        process.exit(1);
    });
}

module.exports = connectToMongo;
