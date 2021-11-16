/** @format */

const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
	id_user: {
		type: String,
		require: true,
	},
	first_name: {
		type: String,
		max: 1024,
		default: "none",
		require: true,
	},
	last_name: {
		type: String,
		max: 20,
		default: "none",
		require: true,
	},
	avatar: {
		type: String,
		max: 20,
		default: "none",
		require: true,
	},
	preference: {
		type: Array,
		default: [],
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

module.exports = mongoose.model("Profile", profileSchema, "profiles");
