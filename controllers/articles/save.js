const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");
const articlesmodel = require('../../models/articles.model');
const usermodel = require('../../models/users.model');
const mongoose = require('mongoose');

const createblog = async (req, res) => {
    const { articleId, title, content, tags, action } = req.body;
    const { userId } = req.user;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            const user = await usermodel.findById(userId);
            if (user !== null) {
                if (articleId && mongoose.Types.ObjectId.isValid(articleId)) {
                    const updateFields = {};
                    if (title && typeof title === 'string' && title.trim() !== '') {
                        updateFields.title = title.trim();
                    }
                    if (content && typeof content === 'string' && content.trim() !== '') {
                        updateFields.content = content.trim();
                    }
                    if (tags && Array.isArray(tags)) {
                        updateFields.tags = tags;
                    }
                    if (action === 'publish') {
                        updateFields.published = true;
                        updateFields.publishDate = Date.now();
                    } else if (action === 'draft') {
                        updateFields.published = false;
                    }
                    const updatedBlog = await articlesmodel.findOneAndUpdate(
                        { _id: articleId, author: userId },
                        { $set: updateFields },
                        { new: true }
                    );
                    if (!updatedBlog) {
                        return responseManager.badrequest(res, "Blog not found or you don't have permission to update it.");
                    }
                    return responseManager.onsuccess(res, updatedBlog, "Blog updated successfully.");
                }
                if (title && title !== null && title !== undefined && typeof title === 'string' && title !== '') {
                    if (content && content !== null && content !== undefined && typeof content === 'string' && content !== '') {
                        if (tags && Array.isArray(tags)) {
                            const newarticle = new articlesmodel({
                                userId,
                                title: title.trim(),
                                content: content.trim(),
                                tags: tags || [],
                                author: userId,
                                published: action === 'publish',
                                publishDate: action === 'publish' ? Date.now() : null,
                            });
                            await newarticle.save();
                            return responseManager.onsuccess(res, newarticle, "Blog created successfully.");
                        } else {
                            return responseManager.badrequest(res, "Tags must be an array of strings.");
                        }
                    } else {
                        return responseManager.badrequest(res, "content is required...!");
                    }
                } else {
                    return responseManager.badrequest(res, "title is required...!");
                }
            } else {
                return responseManager.badrequest(res, "user not found...!");
            }
        } else {
            return responseManager.badrequest(res, "userId is Invaild...!")
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = createblog;


