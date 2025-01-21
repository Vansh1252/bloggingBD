const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const commentmodel = require('../../models/comments.model');
const articlesmodel = require('../../models/articles.model');
const mongoose = require('mongoose');

const deleted = async (req, res) => {
    const { articleId } = req.body;
    const { userId } = req.user
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (articleId && mongoose.Types.ObjectId.isValid(articleId)) {
                const article = await articlesmodel.findById(articleId);
                if (article !== null) {
                    await commentmodel.updateMany(
                        { articleId },
                        { $set: { deleted: article.deleted } }
                    );
                    article.deleted = article.deleted === true ? false : true;
                    await article.save()
                    return responseManager.onsuccess(res, "article is  deleted...!");
                } else {
                    return responseManager.badrequest(res, "article not found...!");
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

module.exports = deleted