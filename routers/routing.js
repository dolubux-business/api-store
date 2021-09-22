/** @format */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const Routes = (app) => {
	//auth
	router.post("/auth/sign-up", authController.SignUp);
	router.post("/auth/sign-in", authController.SignIn);
	router.get("/auth/sign-out", authController.SignOut);

	//Return All routes
	app.use("/api/", router);
};

module.exports = Routes;
