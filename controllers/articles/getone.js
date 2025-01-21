const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const articlesmodel = require('../../models/articles.model');
const mongoose = require('mongoose');


const getonewithoutpaginaction = async (req, res) => {
    const { search } = req.body;
    const { userId } = req.user;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
        const query = {
            deleted: false,
            published: true
        };
        if (search && typeof search === "string" && search.trim() !== "") {
            query.$or = [
                { title: { $regex: search.trim(), $options: "i" } },
            ];
        }
        const blogs = await articlesmodel.find(query)
            .select("username title content tags ")
            .sort({ createdAt: -1 });
        return responseManager.onsuccess(res, blogs, "blog fetched...!");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

const getonewithpaginaction = async (req, res) => {
    const { search, limit, page } = req.body;
    const { userId } = req.user;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return responseManager.badrequest(res, "userId is Invalid...!");
        }
        const itemsPerPage = parseInt(limit) || 10;
        const currentPage = parseInt(page) || 1;
        const query = { deleted: false, published: true };
        if (search && typeof search === "string" && search.trim() !== "") {
            query.$or = [
                { username: { $regex: search.trim(), $options: "i" } },
                { title: { $regex: search.trim(), $options: "i" } },
            ];
        }
        const totalBlogs = await articlesmodel.countDocuments(query);
        const blogs = await articlesmodel.find(query)
            .select("username title content tags")
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage);
        const responseData = {
            total: totalBlogs,
            currentPage,
            totalPages: Math.ceil(totalBlogs / itemsPerPage),
            blogs,
        };
        return responseManager.onsuccess(res, responseData, "blog fetched...!");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = { getonewithpaginaction, getonewithoutpaginaction };
