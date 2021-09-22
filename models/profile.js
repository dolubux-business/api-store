/** @format */

const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
	_id_store: {
		type: String,
		unique: true,
		index: true,
		required: true,
	},

	avatar: {
		type: String,
		max: 1024,
		default: "none",
		require: false,
	},
});

module.exports = mongoose.model("Profile", profileSchema, "profiles");
