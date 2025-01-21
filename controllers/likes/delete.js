const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const likesmodel = require('../../models/likes.model');
const articlesmodel = require('../../models/articles.model');
const mongoose = require('mongoose');

const deletelike = async (req, res) => {
    const { likesId } = req.body;
    const { userId } = req.user;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (likesId && mongoose.Types.ObjectId.isValid(likesId)) {
                const likes = await likesmodel.find(likesId);
                if (likes !== undefined) {
                    const likescount = await articlesmodel.find(likes.likesId);
                    if (likescount !== null) {
                        likescount.likes -= 1;
                        likes.deleted = likes.deleted === true ? false : true;
                        await likes.save()
                        return responseManager.onsuccess(res, "like deleted...!");
                    }
                } else {
                    return responseManager.badrequest(res, "likes not found...!");
                }
            } else {
                return responseManager.badrequest(res, "likesId is Invalid...!");
            }
        } else {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = deletelike;