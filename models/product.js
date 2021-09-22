/** @format */

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	_id_user: {
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
	unit_stock: {
		type: Number,
		default: 0,
		require: true,
	},
	unit_price: {
		type: Number,
		default: 0,
		require: true,
	},
	size: {
		type: Array,
		require: true,
	},
	color: {
		type: Array,
		require: true,
	},
	images: {
		type: Array,
		require: true,
	},
	available: {
		type: Boolean,
		require: true,
	},
	available_discount: {
		type: Boolean,
		require: true,
	},
	discounts: {
		type: Number,
		default: 0,
		require: true,
	},
	ranking: {
		type: Number,
		default: 0,
		require: true,
	},
	note: {
		type: Number,
		default: 0,
		require: true,
	},
	add_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Collection", productSchema, "collections");
