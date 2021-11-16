/** @format */

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const __Token__ = req.header("auth_token");
	if (!__Token__)
		return res.status(401).send({ message: "Acces Denid", satut_code: 401 });

	try {
		const verified = jwt.verify(__Token__, process.env.SECRET_TOKEN);
		req.header = verified;
		next();
	} catch (error) {
		res.status(401).send({ mesage: "invalid token", satut_code: 401 });
	}
};

module.exports = verifyToken;
