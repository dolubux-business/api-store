/** @format */

const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({
	_id_product: {
		type: String,
		unique: true,
		index: true,
		required: true,
	},
	name: {
		type: String,
		min: 3,
		max: 20,
		required: true,
	},
	description: {
		type: String,
		min: 6,
		max: 1024,
		require: true,
	},
	actived: {
		type: Boolean,
		require: true,
	},
	add_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Collection", collectionSchema, "collections");
