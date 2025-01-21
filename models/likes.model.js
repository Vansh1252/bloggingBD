const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    articleId: {
        type: mongoose.Types.ObjectId,
        ref: 'articles',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    username:{
        type:String,
        required:true
    }

}, { timestamps: true });

const likesmodel = mongoose.model('likes', schema);

module.exports = likesmodel;