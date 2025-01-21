const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const commentmodel = require('../../models/comments.model');
const mongoose = require('mongoose');

const getone = async (req, res) => {
    const { userId } = req.user;
    const { articleId } = req.body;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (articleId && mongoose.Types.ObjectId.isValid(articleId)) {
                const comment = await commentmodel.find(articleId);
                if (comment !== null) {
                    return responseManager.onsuccess(res, comment, "comments...!");
                } else {
                    return responseManager.badrequest(res, "NO COMMENT FOUND...!");
                }
            } else {
                return responseManager.badrequest(res, "articleId is Invalid...!");
            }
        } else {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = getone;