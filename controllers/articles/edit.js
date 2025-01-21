const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const articlesmodel = require('../../models/articles.model');
const mongoose = require('mongoose');


const edit = async (req, res) => {
    const { articleId } = req.body;
    const { userId } = req.user;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (mongoose.Types.ObjectId.isValid(articleId)) {
                const article = await articlesmodel.findById(articleId).select('-__v -deleted -createdAt -updatedAt -publishDate -published');
                if (article !== null) {
                    return responseManager.onsuccess(res, article, "article is ready to update...!");
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

module.exports = edit

