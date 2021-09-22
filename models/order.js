/** @format */

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	_id_product: {
		type: String,
		unique: true,
		index: true,
		required: true,
	},
	unit_total_product: {
		type: Number,
		default: 0,
		require: true,
	},
	created_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Collection", productSchema, "collections");
