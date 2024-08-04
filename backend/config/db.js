const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/NoteMaster"

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(() => console.log('Connected Successfully To Database'))
    .catch(error => console.log('Failed to connect', error))
}

module.exports = connectToMongo;