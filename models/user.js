/** @format */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: {
		type: String,
		min: 6,
		max: 255,
		required: true,
	},
	email: {
		type: String,
		min: 6,
		max: 255,
		require: true,
	},
	password: {
		type: String,
		min: 6,
		max: 1024,
		require: true,
	},
	email_verify: {
		type: Boolean,
		default: false,
	},
	role: {
		type: String,
		default: "customer",
	},
	created_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("User", userSchema, "users");
