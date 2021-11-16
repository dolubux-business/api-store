/** @format */

const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
	id_user: {
		type: String,
		unique: true,
		required: true,
	},
	n_product: {
		type: Number,
		default: 10,
		required: true,
	},
	n_category: {
		type: Number,
		default: 2,
		required: true,
	},
	sub: {
		type: String,
		default: "free",
		required: true,
	},
	sub_expire: {
		type: Date,
		default: null,
		required: true,
	},
	sub_month: {
		type: Number,
		default: null,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = {
	Freemiun:
		mongoose.models["Freemiun"] ||
		mongoose.model("Freemiun", subSchema, "user_freemiun"),
	Premiun:
		mongoose.models["Premiun"] ||
		mongoose.model("Premiun", subSchema, "user_premiun"),
};
