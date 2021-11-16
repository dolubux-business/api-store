/** @format */

const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
	id_user: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		min: 3,
		max: 20,
		unique: true,
		index: true,
		required: true,
	},
	description: {
		type: String,
		min: 6,
		max: 1024,
		require: true,
	},
	picture: {
		type: String,
		max: 1024,
		default: "none",
		require: true,
	},
	actived: {
		type: Boolean,
		default: true,
		require: true,
	},
	add_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Category", categorySchema, "categories");
