/** @format */

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const { Freemiun, Premiun } = require("../models/Subscription");

const __USER__ = async (req = request, res = response) => {
	//Get user who create product
	const USER_CONNECT_TOKEN = jwt.decode(req.headers["auth_token"], {
		complete: true,
	});

	const user = await User.findOne({ _id: USER_CONNECT_TOKEN.payload._id });

	const user_sub_freemiun = await Freemiun.findOne({
		id_user: user._id,
	});

	const user_sub_premiun = await Premiun.findOne({
		id_user: user._id,
	});

	return { user, user_sub_freemiun, user_sub_premiun };
};

const __DATA_PRODUCT__ = async (User, Category, _, products) => {
	const owner = await User.findOne({ _id: _.id_owner });
	const category = await Category.findOne({ _id: _.id_category });

	const product = {
		id: _._id,
		owner: owner,
		category: category,
		slug: _.slug,
		name: _.name,
		description: _.description,
		unit_stock: _.unit_stock,
		unit_price: _.unit_price,
		size: _.size,
		color: _.color,
		others: _.others,
		images: _.images,
		available: _.available,
		available_discount: _.available_discount,
		discounts: _.discounts,
		ranking: _.ranking,
		note: _.note,
		add_at: _.add_at,
	};

	products.push(product);
};

const user_owner_connect = async (req = request, res = response, User) => {
	//Get user who create product
	const USER_CONNECT_TOKEN = jwt.decode(req.headers["auth_token"], {
		complete: true,
	});
	const __ID_TOKEN__ = USER_CONNECT_TOKEN.payload._id;
	const __USER__ = await User.findOne({ _id: __ID_TOKEN__ });

	if (__ID_TOKEN__ != __USER__._id) {
		return res.send({
			message:
				"Access Denied ! this user is not authorized to create this category...",
			satut_code: 401,
		});
	}
};

module.exports = {
	__USER__,
	__DATA_PRODUCT__,
	user_owner_connect,
};
