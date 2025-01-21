const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    articleId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    

}, { timestamps: true });

const likesmodel = mongoose.model('likes', schema);

module.exports = likesmodel;