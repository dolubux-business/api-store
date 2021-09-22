/** @format */

//sendGrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// var nodemailer = require("nodemailer");
// var smtpTransport = require("nodemailer-smtp-transport");

// var transporter = nodemailer.createTransport(
// 	smtpTransport({
// 		service: "gmail",
// 		host: "smtp.gmail.com",
// 		auth: {
// 			user: "dolubux@gmail.com",
// 			pass: "dolubux-nxs-20",
// 		},
// 		tls: {
// 			rejectUnauthorized: false,
// 		},
// 	})
// );

// Handle of sender mail for SendGrid
route.post("/dlx-send-mail", async (req, res) => {
	const { nameClient, emailClient, subClient, msgClient } = req.body;

	const msg = {
		to: emailClient, // Change to your recipient
		from: "dolubux@gmail.com", // Change to your verified sender
		subject: "[Dolubux] Nous analyse maintemant votre projet !",
		text: `Nous avons bien reçu votre demande de création ${subClient}. Afin mieux satisfait
		votre demande, nous analyserons votre projet avec le plus grand soin,
		dans le but d 'imaginer la meilleure solution qui sera adaptée à votre projet
		business.`,
		html: ` <h2><strong>Salut,  ${nameClient}</strong></h2> 
				
			<p> Nous avons bien reçu votre demande de création << ${subClient} >>. Afin de mieux satisfait
			votre demande, nous analysons votre projet avec le plus grand soin,
			dans le but d'imaginer la meilleure solution, qui sera adaptée à votre projet
			business.</p>

			<p>Nous aidons nos clients, dans la conception des solutions digital, pour
			augmenter les performances de leurs entreprises.</p>
	
			On se contact? : <br/>
			Email: dolubux@gmail.com <br/>
			WhatSapp: https://wa.me/message/QJ5VAIIE4BY5E1 <br/>
			Telephone: +2250757357748 <br/>
			site web: https://dolubux.vercel.app <br>
			<br/><br/>
			<p>Merci pour votre confiance. L'equique, <b>Dolubux, Dolubux Business</b> </p>
		`,
	};

	const responseReplyMessage = await sgMail.send(msg);

	// if (responseReplyMessage) {
	// 	var mailOptions = {
	// 		from: "dolubux@gmail.com",
	// 		to: "dolubux@gmail.com",
	// 		subject: subClient,
	// 		text: `${nameClient} <${mailClient}> \n ${msgClient}`,
	// 	};

	// 	const responseRecevieMessage = await transporter.sendMail(mailOptions);
	// }
});
