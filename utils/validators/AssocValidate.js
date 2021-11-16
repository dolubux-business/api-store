/** @format */

const joi = require("@hapi/joi");
const productValidate = (data) => {
	const Schema = joi.object({
		name: joi.string().min(3).max(144).required(),
		id_category: joi.string().required(),
		description: joi.string().min(3).max(255).required(),
		unit_stock: joi.number().allow(""),
		unit_price: joi.number().allow(""),
		size: joi.array().allow(""),
		color: joi.array().allow(""),
		images: joi.array().required(),
		available: joi.boolean().allow(""),
		available_discount: joi.boolean().allow(""),
		discounts: joi.number().allow(""),
		ranking: joi.number().allow(""),
		note: joi.number().allow(""),
		bio: joi.string().min(3).max(502),
	});

	return Schema.validate(data);
};

const categoryValidate = (data) => {
	const Schema = joi.object({
		name: joi.string().min(3).max(100).required(),
		description: joi.string().min(3).max(144).required(),
	});

	return Schema.validate(data);
};

module.exports = {
	productValidate,
	categoryValidate,
};
