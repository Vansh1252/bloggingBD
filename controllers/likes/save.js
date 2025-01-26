const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const likesmodel = require('../../models/likes.model');
const articlesmodel = require('../../models/articles.model');
const usermodel = require('../../models/users.model');
const mongoose = require('mongoose');

const savelikes = async (req, res) => {
    const { articleId } = req.body;
    const { userId } = req.user;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (mongoose.Types.ObjectId.isValid(articleId)) {
                const user = await usermodel.findById(userId).select('username');
                const article = await articlesmodel.findById(articleId);
                if (article !== null) {
                    const likes = await likesmodel({
                        articleId,
                        userId,
                        username: user.username,
                    });
                    article.likes += 1;
                    await article.save();
                    await likes.save();
                    return responseManager.onsuccess(res, "like a artciles...!");
                } else {
                    return responseManager.badrequest(res, "no article to likes...!");
                }
            } else {
                return responseManager.badrequest(res, "articles Is Invalid...!");
            }
        } else {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
    } catch (error) {
        console.log(error);
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = savelikes;

