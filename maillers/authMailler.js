/** @format */

//sendGrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Handle of sender mail for SendGrid
const __ALL__ = async (req, res) => {
	const { nameClient, emailClient, subClient, msgClient } = req.body;

	const msg = {
		to: emailClient, // Change to your recipient
		from: "dolubux@gmail.com", // Change to your verified sender
		subject: `[Likidon] - ${subClient}`,
		text: `Test`,
		html: ` <h2><strong>Salut,  ${nameClient}</strong></h2>

		${msgClient}

		<p>Merci pour votre confiance. L'equique, <b>Likidon, Dolubux Business</b> </p>
		`,
	};

	try {
		const responseReplyMessage = await sgMail.send(msg);
		res.status(201).send(responseReplyMessage);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: "An error occured ! impossible to send this mail...",
			satut_code: 500,
		});
	}
};

module.exports = {
	__ALL__,
};
