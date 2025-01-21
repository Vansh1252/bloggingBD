const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const likesmodel = require('../../models/likes.model');
const mongoose = require('mongoose');

const getonelikes = async (req, res) => {
    const { articlesId, search } = req.body;
    const { userId } = req.user;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (mongoose.Types.ObjectId.isValid(articlesId)) {
                const query = { articlesId }
                if (search && search !== null && search !== undefined && typeof search === "string" && search.trim() !== "") {
                    query.$or = [
                        { username: { $regex: search.trim(), $options: "i" } },
                    ];
                }
                const likes = await likesmodel.find(query).select(' userId username');
                if (likes !== null) {
                    return responseManager.onsuccess(res, likes, "likes of the articles...!");
                } else {
                    return responseManager.badrequest(res, "likes not found...!");
                }
            } else {
                return responseManager.badrequest(res, "articlesId is Invalid...!");
            }
        } else {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = getonelikes