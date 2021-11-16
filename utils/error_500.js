/** @format */

module.exports.error_catch = (res, error, message) => {
	console.log(error);
	res.send({
		message,
		satut_code: 500,
	});
};
