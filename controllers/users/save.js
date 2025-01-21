const mongoose = require("mongoose");
const usermodel = require("../../models/users.model");
const bcrypt = require("bcrypt")
const responseManager = require("../../utilities/responseManager");
const constants = require("../../utilities/constants");

const userhandler = async (req, res) => {
    try {
        const { fullname, username, email, password, confirmpassword } = req.body
        if (fullname === null || fullname === undefined || fullname.trim() === '' || typeof fullname !== 'string') {
            return responseManager.badrequest(res, "fullname is required...!");
        }
        if (username === null || username === undefined || username.trim() == '' || typeof username !== 'string') {
            return responseManager.badrequest(res, "username is required...!");
        }
        const usernames = await usermodel.findOne({ username }).lean();
        console.log(usernames);
        if (usernames) {
            return responseManager.badrequest(res, "username not available ")
        }
        if (email === null || email === undefined || email.trim() === '' || typeof email !== 'string') {
            return responseManager.badrequest(res, "email is required...!");
        }
        let existingemail = await usermodel.findOne({ email })
        if (existingemail) {
            return responseManager.badrequest(res, "email is already in use...!");
        }
        if (password === null || password === undefined || password.trim() === '' || typeof password !== 'string') {
            return responseManager.badrequest(res, "password is required...!");
        }
        if (password.length < 8) {
            return responseManager.badrequest(res, "password should be 8 character long to be valid...!");
        }
        if (password !== confirmpassword) {
            return responseManager.badrequest(res, "Passwords do not match.");
        }
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
    } catch (error) {
        console.log(error);
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = userhandler;
