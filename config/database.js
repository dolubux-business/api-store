/** @format */

const Database = (mongoose) => {
	//Database Connect
	mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});

	let db = mongoose.connection;
	//Return databse
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", function () {
		console.log("Connection Successful!");
	});
};

module.exports = Database;
