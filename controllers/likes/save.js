const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const likesmodel = require('../../models/likes.model');
const articlesmodel = require('../../models/articles.model');
const usermodel = require('../../models/users.model');
const mongoose = require('mongoose');

const savelikes = async (req, res) => {
    const { articlesId } = req.body;
    const { userId } = req.user;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (mongoose.Types.ObjectId.isValid(articlesId)) {
                const user = await usermodel.findById(userId).select('username');
                const article = await articlesmodel.findById(articlesId);
                if (article !== null) {
                    const likes = await likesmodel({
                        articlesId,
                        userId,
                        username: user.username,
                    });
                    article.likes += 1;
                    await likes.save();
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
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = savelikes;

