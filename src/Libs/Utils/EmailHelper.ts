import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

require('dotenv').config();

const transporter: any = nodemailer.createTransport(
	new SMTPTransport({
		host: process.env.SMTP_HOST || ' ',
		port: Number(process.env.SMTP_PORT), // Use 587 for TLS
		secure: true, // Use false for port 587 (TLS)
		auth: {
			user: process.env.SMTP_USER, // Your cPanel email
			pass: process.env.SMTP_PASS, // Your email password
		},
	})
);

// export const sendEmail = async (to: string, subject: string, text: string) => {
// 	try {
// 		const info = await transporter.sendMail({
// 			from: '"Space U" <noreply@spaceu.ng>',
// 			to,
// 			subject,
// 			html: emailHtml,
// 		});
// 		console.log('Email sent:', info.messageId);
// 	} catch (error) {
// 		console.error('Error sending email:', error);
// 	}
// };

// sendEmail('tosin.noel@getnada.com', 'Test Email', 'Hello from Node.js!');

export const sendCustomerBookingEmail = async (booking: any) => {
	const emailTemplatePath = path.join(__dirname, '../Templates/booking.ejs');
	const emailHtml = fs.readFileSync(emailTemplatePath, 'utf8');
	console.log(booking.user.name);
	const data = {
		customerName: booking.user.name,
		reservations: booking.reservations,
	};
	const htmlContent = ejs.render(emailHtml, data);

	try {
		const info = await transporter.sendMail({
			from: '"Space U" <noreply@spaceu.ng>',
			to: booking.user.email,
			subject: 'Booking Successful',
			html: htmlContent,
		});
		console.log('Email sent:', info.messageId);
	} catch (error) {
		console.error('Error sending email:', error);
	}
};
