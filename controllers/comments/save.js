const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const commentmodel = require('../../models/comments.model');
const mongoose = require('mongoose');

const commentsave = async (req, res) => {
    const { userId } = req.user;
    const { articleId, commentId, content } = req.body;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (mongoose.Types.ObjectId.isValid(articleId)) {
                if (content && content !== undefined && content !== null && typeof content === 'string' && content !== '') {
                    if (commentId && mongoose.Types.ObjectId.isValid(commentId)) {
                        const existingcomment = await commentmodel.findByIdAndUpdate(commentId, { content: content }, { new: true }).lean();
                        if (existingcomment !== null) {
                            return responseManager.onsuccess(res, existingcomment, "comment updated successfully...!");
                        } else {
                            return responseManager.badrequest(res, "comment not found...!");
                        }
                    } else {
                        const comment = await commentmodel({
                            articleId,
                            userId: userId,
                            content,
                        })
                        await comment.save();
                    } return responseManager.onsuccess(res, "comment add successfully...!");
                } else {
                    return responseManager.badrequest(res, "content should be in an string...!");
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

module.exports = commentsave;