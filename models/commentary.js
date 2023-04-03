const mongoose = require('mongoose');

const commentarySchema = new mongoose.Schema({
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
    },
    associatedArticle: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Comm', commentarySchema)