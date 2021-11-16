/** @format */
const { response, request } = require("express");

const Create = async (
	req = request,
	res = response,
	init,
	validate,
	mounted
) => {
	init = req.body;

	//Get user who create product
	const USER_CONNECT_TOKEN = jwt.decode(req.headers["auth_token"], {
		complete: true,
	});

	if (!USER_CONNECT_TOKEN) {
		return res.send({
			message:
				"Access Denied ! this user is not authorized to create this category...",
			satut_code: 401,
		});
	}

	//Verifed the validation of page feild
	const { error } = await validate(initCaty);
	if (error)
		return res.send({
			error: {
				message: error.details[0].message,
				path: error.details[0].context.label,
			},
		});

	const verify_if_element_exist = mounted.findOne({ name: initCaty });

	if (!verify_if_caty_name_exist)
		return res.send({
			message: `this ${mounted} is not exists in the database`,
			satut_code: 404,
		});

	try {
		const __MOUNT__ = new mounted(initCaty);
		__MOUNT__.save;

		res.send({ message: "successfull", statut_code: 201 });
	} catch (error) {
		console.log(error);
		res.send({
			message: `An error occured ! impossible to create a product...`,
			satut_code: 500,
		});
	}
};

module.exports = {
	Create,
};
