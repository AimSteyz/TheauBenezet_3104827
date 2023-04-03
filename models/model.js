const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)