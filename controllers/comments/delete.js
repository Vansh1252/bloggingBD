const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const articlesmodel = require('../../models/articles.model');
const commentmodel = require('../../models/comments.model');
const mongoose = require('mongoose');

const deleted = async (req, res) => {
    const { commentId } = req.body;
    const { userId } = req.user
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (commentId && mongoose.Types.ObjectId.isValid(commentId)) {
                const comment = await commentmodel.find(commentId);
                if (comment !== undefined) {
                    const commentcount = await articlesmodel.findOne(comment.commentcount);
                    if (commentcount !== null) {
                        commentcount.comment -= 1;
                        comment.deleted = comment.deleted === true ? false : true;
                        await comment.save()
                        return responseManager.onsuccess(res, "username deleted...!");
                    }
                } else {
                    return responseManager.badrequest(res, "comment not found...!");
                }
            } else {
                return responseManager.badrequest(res, "commentId is Invalid...!");
            }
        } else {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = deleted