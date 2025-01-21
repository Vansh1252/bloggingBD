const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const responseManager = require("../../utilities/responseManager");
const usermodel = require('../../models/users.model');
const constants = require('../../utilities/constants');

const loginofuser = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username === null || username === undefined || username.trim() == '' || typeof username !== 'string') {
            return responseManager.badrequest(res, "Please provide username..!");
        }
        if (password === null || password === undefined || password.trim() === '' || typeof password !== 'string') {
            return responseManager.badrequest(res, "Please provide password...!");
        }
        let user = await usermodel.findOne({ username });
        if (!user) {
            return responseManager.badrequest(res, "user not found...!");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return responseManager.badrequest(res, "Invalid email or password.");
        }
        let token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
        );
        return responseManager.onsuccess(res, token, "Login successful!");
    } catch (error) {
        console.log(error);
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = loginofuser;

