/** @format */

const { response, request } = require("express");
const jwt = require("jsonwebtoken");

//Models
const Subscription = require("../models/Subscription");
const User = require("../models/User");

//Services & Helpers
const { __USER__ } = require("../services/userService");

/*
 * *
 * *
 * *
 * *
 * *
 * *
 */
const verifyRemainingSub = async (req = request, res = response, next) => {
	const { user_sub_premiun, user_sub_freemiun } = await __USER__(req, res);

	if (user_sub_premiun.n_product === 0 || user_sub_freemiun.n_product === 0) {
		return res.status(401).send({
			message: "Your number of creation product in summer reached",
			satut_code: 401,
		});
	} else if (
		user_sub_premiun.n_category === 0 ||
		user_sub_freemiun.n_category === 0
	) {
		return res.status(401).send({
			message: "Your number of creation category in summer reached",
			satut_code: 401,
		});
	}

	next();
};

/*
 * *
 * *
 * *
 * *
 * *
 * *
 */
const verifyIfUserIsFreemiun = async (req = request, res = response, next) => {
	const { user } = await __USER__(req, res);

	if (user.ispremiun === false) {
		const sub = await Subscription.findOne({ id_user: user._id });

		await User.findOneAndUpdate({ ispremiun: true });
		await Subscription.findOneAndUpdate({
			id_user: user._id,
			n_product: 100,
			n_category: 10,
			n_video: 10,
			sub: "premiun",
			sub_expire: null,
			sub_month: 0,
		});
		return res.status(401).send({
			message: "You subscription has expired",
			satut_code: 401,
		});
	}

	next();
};

module.exports = verifyIfUserIsPremiun;
