const mongoose = require("mongoose");
const usermodel = require("../../models/users.model");
const bcrypt = require("bcrypt")
const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");

const userhandler = async (req, res) => {
    try {
        const { fullname, username, email, password, confirmpassword } = req.body
        if (fullname && fullname != null && fullname != undefined && fullname.trim() != '' && typeof fullname === 'string') {
            if (username && username != null && username != undefined && username.trim() != '' && typeof username === 'string' && /^(?=.*[A-Z])(?=(.*\d){4})/.test(username)) {
                const usernames = await usermodel
                    .findOne({ username: { $regex: `^${username}$`, $options: "i" } })
                    .lean();
                if (usernames === null) {
                    if (email && email != null && email != undefined && email.trim() != '' && typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        let existingmail = await usermodel.findOne({ email })
                        if (existingmail === null) {
                            if (password && password != null && password != undefined && password.trim() != '' && typeof password === 'string' && password.length >= 8) {
                                if (password === confirmpassword) {
                                    const salt = await bcrypt.genSalt(10);
                                    const hashedPassword = await bcrypt.hash(password, salt);
                                    const createuser = new usermodel({
                                        fullname,
                                        username,
                                        email,
                                        password: hashedPassword,
                                    });
                                    await createuser.save();
                                    return responseManager.created(res, createuser, constants.RESPONSE_MESSAGES.USER_CREATED);
                                } else {
                                    return responseManager.badrequest(res, "Passwords do not match.");
                                }
                            }
                            else {
                                return responseManager.badrequest(res, "password is required...!");
                            }

                        } else {
                            return responseManager.badrequest(res, "email is already in use...!");
                        }
                    } else {
                        return responseManager.badrequest(res, "email is required...!");
                    }
                } else {
                    return responseManager.badrequest(res, "username not available ")
                }
            } else {
                return responseManager.badrequest(res, "username is required...!");
            }
        } else {
            return responseManager.badrequest(res, "fullname is required...!");
        }
    } catch (error) {
        console.log(error);
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = userhandler;
