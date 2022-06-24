const mongoose = require('mongoose');
const monURI = "mongodb://localhost:27017"
const connectToMongo = () => {
    mongoose.connect(monURI,() => {
        console.log("Mongo Connection Success!")
    })
}

module.exports = connectToMongo;