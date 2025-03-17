import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { convertMinutesToTime, formatDate } from './ReservationHelper';
import { generateGoogleCalendarLink } from '../Constant/TimeConstant';

require('dotenv').config();
const contactEmail = process.env.CONTACT_EMAIL;
const contactPhone = process.env.CONTACT_PHONE;
const contactAddress = process.env.CONTACT_ADDRESS;

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

const formatData = (booking: any) => {
	return {
		customerName: booking.user.name,
		contactEmail,
		contactPhone,
		contactAddress,
		reservations: booking.reservations.map((reservation: any) => ({
			...reservation, // Keep other properties if needed
			start_time: convertMinutesToTime(reservation.start_time),
			end_time: convertMinutesToTime(reservation.end_time),
			date: formatDate(reservation.date),
			calender_link: generateGoogleCalendarLink(
				reservation.space.name,
				reservation.date,
				reservation.start_time,
				reservation.end_time
			),
		})),
	};
};

export const sendCustomerBookingEmail = async (booking: any) => {
	const emailTemplatePath = path.join(
		__dirname,
		'../Templates/customer_booking.ejs'
	);
	const emailHtml = fs.readFileSync(emailTemplatePath, 'utf8');
	const htmlContent = ejs.render(emailHtml, formatData(booking));

	try {
		const info = await transporter.sendMail({
			from: '"Space U" <noreply@spaceu.ng>',
			to: booking.user.email,
			subject: 'Booking Successful',
			html: htmlContent,
		});

		console.log('Customer Email sent', info.messageId);
	} catch (error) {
		console.error('Error sending email:', error);
	}
};

export const sendAdminsBookingEmail = async (booking: any) => {
	const emailTemplatePath = path.join(
		__dirname,
		'../Templates/admin_booking.ejs'
	);
	const emailHtml = fs.readFileSync(emailTemplatePath, 'utf8');
	const htmlContent = ejs.render(emailHtml, formatData(booking));

	try {
		const info = await transporter.sendMail({
			from: '"Space U" <noreply@spaceu.ng>',
			to: contactEmail,
			subject: 'New Booking',
			html: htmlContent,
		});
		console.log('Admin Email sent:', info.messageId);
	} catch (error) {
		console.error('Error sending email:', error);
	}
};

export const sendContactUsEmail = async (data:any) => {
	const emailTemplatePath = path.join(
		__dirname,
		'../Templates/contact_us.ejs'
	);
	const emailHtml = fs.readFileSync(emailTemplatePath, 'utf8');
	const validateData = {
		...data,
		contactEmail,
		contactPhone,
		contactAddress,
	};

	const htmlContent = ejs.render(emailHtml, validateData);
	try {
		const info = await transporter.sendMail({
			from: '"Space U" <noreply@spaceu.ng>',
			to: contactEmail,
			subject: "New Message",
			html: htmlContent,
		});
		console.log('Contact us Email sent:', info.messageId);
	} catch (error) {
		console.error('Error sending email:', error);
	}
};