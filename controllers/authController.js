/** @format */

const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
	SignUpValidation,
	SignInValidation,
} = require("../helpers/validators/authValidate");
const Profile = require("../models/profile");
const { request, response } = require("express");

/*
**********************************************************
                  HANDLE OF THE SIGN UP
**********************************************************
*/
const SignUp = async (req, res) => {
	const initUp = req.body;

	//Check if the data contains an error
	const errValidate = await SignUpValidation(initUp);
	if (errValidate.error)
		return res.send({ error: errValidate.error.details[0] });

	//Checking if usename exist in the database
	const usernameExist = await User.findOne({ username: initUp.email });
	if (usernameExist)
		return res.send({
			error: {
				message: "This username is already taken",
				path: ["username"],
			},
		});

	//Checking if email exist in the database
	const emailExist = await User.findOne({ email: initUp.email });
	if (emailExist)
		return res.send({
			error: {
				message: "This email is already taken",
				path: ["email"],
			},
		});

	//Hash the password with bcrypt
	const salt = await bcrypt.genSalt(10);
	const HashPassword = await bcrypt.hash(req.body.password, salt);

	//Creating a new user
	const user = new User({
		username: req.body.username.trim().toLowerCase(),
		email: req.body.email,
		password: HashPassword,
	});

	//Creating a new profile associated to current user
	const profile = new Profile({
		_id_user: user._id,
	});

	try {
		const savedUser = await user.save(); //Insert user in database
		const savedProfile = await profile.save(); //add a profile to current user
		res.json({
			success: { user: savedUser, profile: savedProfile },
			error: null,
		});
	} catch (err) {
		res.send("An error occured ! impossible to created user...");
	}
};

/*
**********************************************************
                  HANDLE OF THE SIGN IN
**********************************************************
*/

const SignIn = async (req = request, res = response) => {
	//Check if the data contains an error
	const initIn = req.body;
	const errValidate = await SignInValidation(initIn);
	if (errValidate.error)
		return res.send({ error: errValidate.error.details[0] });

	const user = await User.findOne({ email: initIn.email });

	//Checking if password is not valid
	const isvalidPass = await bcrypt.compare(req.body.password, user.password);
	if (!isvalidPass)
		return res.send({
			error: {
				message: "Email or password is wrong",
				path: ["email"],
			},
		});

	try {
		//Generate a new token and sign current user
		const __Token__ = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
			expiresIn: "180000s",
		});
		res.header("auth_token", __Token__).send(__Token__);
	} catch (error) {
		res.send("An error occured ! impossible to connected...");
	}
};

/*
**********************************************************
                  HANDLE OF THE SIGN OUT
**********************************************************
*/
const SignOut = async (req, res) => {
	//Delete the current token for deconnected user!

	try {
		res.header("auth_token", "").send("Sign out with sucessfull");
	} catch (error) {
		res.send("An error occured ! impossible to signOut...");
	}
};

module.exports = {
	SignUp,
	SignIn,
	SignOut,
};
