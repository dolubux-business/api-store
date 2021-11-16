/** @format */

const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
	id_user: {
		type: String,
		require: true,
	},
	name: {
		type: String,
		default: "none",
		require: true,
		unique: true,
	},
	logo: {
		type: String,
		max: 1024,
		default: "none",
		require: true,
	},
	order_contacts: {
		type: Array,
		default: [],
	},

	bio: {
		type: String,
		max: 1024,
		default: "none",
		require: false,
	},

	created_at: {
		type: Date,
		default: Date.now(),
		unique: true,
	},
	modify_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Store", storeSchema, "stores");
