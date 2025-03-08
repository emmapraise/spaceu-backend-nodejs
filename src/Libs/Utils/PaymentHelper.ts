import axios from 'axios';
require('dotenv').config();

const paystack_url = process.env.PAYSTACK_URL;
const paystack_secret = process.env.PAYSTACK_SECRET;
const frontend_url = process.env.FRONTEND_URL;

export const initializePayment = async (
	email: string,
	amount: number,
	reservations: any[]
) => {
	try {
		const total_amount = parseInt(amount.toString()) * 100;
		return await axios.post(
			`${paystack_url}/transaction/initialize`,
			{
				amount: total_amount, // amount in kobo
				currency: 'NGN',
				email: email,
				metadata: {
					custom_fields: reservations.map((reservation: any) => ({
						space_name: reservation.space.name,
						amount: reservation.price,
					})),
				},
				callback_url: `${frontend_url}/booking-status`,
			},
			{
				headers: {
					Authorization: `Bearer ${paystack_secret}`,
					'Content-Type': 'application/json',
				},
			}
		);
	} catch (error) {
		console.error('Error initializing payment', error);
	}
};

export const validatePaymentStatus = (reference: string) => {
	try {
		return axios.get(`${paystack_url}/transaction/verify/${reference}`, {
			headers: {
				Authorization: `Bearer ${paystack_secret}`,
			},
		});
	} catch (error) {
		console.error('Error validating payment status', error);
	}
};
