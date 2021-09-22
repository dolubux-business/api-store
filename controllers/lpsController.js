/** @format */

// /** @format */

// const router = require("express").Router();
// const Page = require("../models/page");
// const {
// 	pageValidation,
// 	pageSwiperValidation,
// } = require("../helpers/validators/pageValidate");
// const { response, request } = require("express");
// const jwt = require("jsonwebtoken");

// const CreatePage = async (req = request, res = response) => {
// 	const initPage = req.body;

// 	//Verifed the validation of page feild
// 	const errValidate = await pageSwiperValidation(initPage);
// 	if (errValidate.error)
// 		return res.send({ error: errValidate.error.details[0] });

// 	//Verifed if page name exist in database
// 	const PageName = await Page.findOne({ page_name: initPage.page_name });
// 	if (PageName)
// 		return res.send({
// 			error: {
// 				message: "This page name is already taken",
// 				path: ["page_name"],
// 			},
// 		});

// 	const getCurrent_Id = jwt.decode(req.cookies.auth_token, { complete: true });

// 	//Creating a new user
// 	const swiper = new User({
// 		_id_user: getCurrent_Id.payload.aud,
// 		logo: initPage.logo,
// 		page_name: initPage.page_name,
// 		slogan: initPage.slogan,
// 		color: initPage.color,
// 		order_Contact: initPage.order_Contact,
// 		swiper: initPage.swiper,
// 	});

// 	try {
// 		const SaveSwiperPage = await swiper.save();
// 		res.send({ getCurrent_Id, data: initPage });
// 	} catch (error) {
// 		res.send("a mistake is the product");
// 	}
// };

// module.exports = {
// 	Create: CreatePage,
// };
