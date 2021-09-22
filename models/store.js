/** @format */

const mongoose = require("mongoose");

const PageSchema = mongoose.Schema({
	_id_profile: {
		type: String,
		unique: true,
		index: true,
		required: true,
	},
	logo: {
		type: String,
		max: 1024,
		require: true,
	},
	store_name: {
		type: String,
		main: 3,
		max: 64,
		require: true,
	},

	contacts: {
		wa: {
			type: String,
			min: 8,
			max: 24,
			require: true,
		},
		insta: {
			type: String,
			min: 8,
			max: 24,
			require: true,
		},
		mger: {
			type: String,
			min: 8,
			max: 24,
			require: true,
		},
	},
	bio: {
		type: String,
		min: 8,
		max: 24,
		require: true,
	},
});

module.exports = mongoose.model("Store", PageSchema, "stores");
