const mongoose = require('mongoose');

const articleschema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    comment: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    published: {
        type: Boolean,
        default: false
    },
    publishDate: {
        type: Date,
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const articlesmodel = mongoose.model('articles', articleschema);

module.exports = articlesmodel