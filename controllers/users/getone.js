const mongoose = require("mongoose");
const usermodel = require("../../models/users.model");
const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");


const getone = async (req, res) => {
    const { userId } = req.user;
    const { search } = req.body;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            const query = { deleted: false };
            if (search && typeof search === "string" && search.trim() !== "") {
                query.$or = [
                    { username: { $regex: search.trim(), $options: "i" } },
                ];
            }
            const user = await usermodel.find(query)
                .select('username')
            return responseManager.onsuccess(res, user, "blog fetched...!");
        } else {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = getone;