/** @format */

const joi = require("@hapi/joi");
const pageValidation = (data) => {
	const Schema = joi.object({
		logo: joi.string().required(),
		page_name: joi.string().min(3).max(144).required(),
		slogan: joi.string().min(3).max(255).required(),
		color: joi.string().allow(""),
		contacts: {
			wa: joi.string().allow(""),
			insta: joi.string().allow(""),
			mger: joi.string().allow(""),
		},
		bio: joi.string().min(3).max(502),
	});

	return Schema.validate(data);
};

const pageSwiperValidation = (data) => {
	const Schema = joi.object({
		logo: joi.string().required(),
		page_name: joi.string().min(3).max(144).required(),
		slogan: joi.string().min(3).max(255).required(),
		color: joi.string().allow(""),
		order_Contact: joi.string().allow(""),
		swiper: joi.array().required(),
	});

	return Schema.validate(data);
};

module.exports = {
	pageValidation,
	pageSwiperValidation,
};
