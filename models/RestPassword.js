/** @format */

const mongoose = require("mongoose");

const restPasswordSchema = mongoose.Schema({
	id_user: {
		type: String,
		index: true,
		unique: true,
		require: true,
	},
	restPasswordToken: {
		type: String,
		default: null,
		require: true,
	},
	expire: {
		type: Date,
		default: null,
		require: true,
	},
});

module.exports = mongoose.model("RestPassword", restPasswordSchema, "reset");
