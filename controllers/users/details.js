const mongoose = require("mongoose");
const usermodel = require("../../models/users.model");
const articlesmodel = require('../../models/articles.model');
const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");

const detailsofuser = async (req, res) => {
    const { userid } = req.body;
    const { userId } = req.user
    try {
        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            if (userid && mongoose.Types.ObjectId.isValid(userid)) {
                const user = await usermodel.findById(userid).select('username');
                if (user !== null) {
                    const article = await articlesmodel.findById(userid).select('');
                    if (article !== null) {
                        return responseManager.onsuccess(res, { user, article }, "data fetched...!");
                    } else {
                        return responseManager.badrequest(res, "NOT POSTED ANY ARTICLE...!");
                    }
                } else {
                    return responseManager.badrequest(res, "user not found...!");
                }
            } else {
                return responseManager.badrequest(res, "userid is Invalid...!");
            }
        } else {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = detailsofuser