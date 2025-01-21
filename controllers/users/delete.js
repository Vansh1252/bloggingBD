const mongoose = require("mongoose");
const usermodel = require("../../models/users.model");
const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");

const deleted = async (req, res) => {
    const { userId } = req.user;
    try {
        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            const user = await usermodel.findById(userId);
            if (user !== undefined) {
                user.deleted = user.deleted === true ? false : true;
                await user.save()
                return responseManager.onsuccess(res, "username deleted...!");
            } else {
                return responseManager.badrequest(res, "username not found...!");
            }
        } else {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = deleted