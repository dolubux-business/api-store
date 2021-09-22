/** @format */

require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

// IMPORT INIT
const InitRoutes = require("./routers/routing");
const InitDatabase = require("./config/database");

InitDatabase(mongoose);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//use the cros access
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"PUT, GET, POST, DELETE, OPTIONS"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

//MIDDLEWARE ROUTE
InitRoutes(app);

app.listen("3000", "localhost", () => {
	console.log("server is listening on 3000 port");
});

module.exports = app;
