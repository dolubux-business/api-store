/** @format */

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	id_owner: {
		type: String,
		required: true,
	},
	id_category: {
		type: String,
		required: true,
	},
	id_store: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		unique: true,
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
	others: {
		type: Array,
		// default: [{name: '', value: ''}],
		require: true,
	},
	images: {
		type: Array,
		require: true,
	},
	available: {
		type: Boolean,
		default: true,
		require: true,
	},
	available_discount: {
		type: Boolean,
		default: false,
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
		default: 100,
		require: true,
	},
	add_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports =
	mongoose.models["Product"] ||
	mongoose.model("Product", productSchema, "products");
