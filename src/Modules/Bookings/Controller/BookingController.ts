import { Request, Response } from 'express';

import {
	createBooking,
	indexModel,
	findBookingById,
	findBookingByUserId,
	getBookingByAnonymousId,
	bookingConfirmedModel,
	getBookingByReference,
} from '../Model/BookingModel';
import { getAnonymousReservationsModel } from '../Model/ReservationModel';
import { upsertUserByEmail } from '../../Users/Model/UserModel';
import {
	initializePayment,
	validatePaymentStatus,
} from '../../../Libs/Utils/PaymentHelper';
import {
	sendAdminsBookingEmail,
	sendCustomerBookingEmail,
} from '../../../Libs/Utils/EmailHelper';

export const createBookingHandler = async (req: Request, res: Response) => {
	try {
		const validatedRecord = req.validated();
		const anonymousId: any = req.anonymous_id;

		if (!anonymousId) {
			res.status(400).json({ message: 'Anonymous ID is required' });
			return;
		}

		const bookingExists = await getBookingByAnonymousId(anonymousId);
		if (bookingExists) {
			res.status(409).json({ message: 'Booking already exists' });
			return;
		}

		const reservations = await getAnonymousReservationsModel(anonymousId);
		if (!reservations.length) {
			res.status(400).json({ message: 'No reservations found' });
			return;
		}

		let total_amount: number = 0;
		reservations.forEach((reservation: any) => {
			total_amount += reservation.price;
		});

		const userData = await upsertUserByEmail(validatedRecord);

		const paymentData = await initializePayment(
			userData.email,
			total_amount,
			reservations
		);

		if (!paymentData?.data.status) {
			res.status(400).json({ message: 'Payment failed' });
			return;
		}

		const { data } = paymentData.data;

		const result = await createBooking(
			userData,
			reservations,
			total_amount,
			anonymousId,
			data.reference
		);
		res
			.json({
				message: 'Created booking successfully',
				status: true,
				authorization_url: data.authorization_url,
				data: result,
			})
			.status(201);
		return;
	} catch (error: any) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

export const getBookingsHandler = async (req: Request, res: Response) => {
	try {
		const result = await indexModel();
		res
			.json({
				message: 'Got booking successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getBookingByIdHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await findBookingById(parseInt(id));
		res
			.json({
				message: 'Got booking successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getBookingsByUserIdHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { user_id } = req.params;
		const result = await findBookingByUserId(parseInt(user_id));
		res
			.json({
				message: 'Got booking successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const confirmBookingHandler = async (req: Request, res: Response) => {
	try {
		const { reference } = req.validated();

		const paymentData = await validatePaymentStatus(reference);

		if (!paymentData?.data.status) {
			res.status(400).json({ message: 'Payment failed', status: false });
			return;
		}

		const result = await bookingConfirmedModel(reference);

		getBookingByReference(reference)
			.then((booking) => {
				sendCustomerBookingEmail(booking);
				sendAdminsBookingEmail(booking);
			})
			.catch((error) => console.error('Error fetching booking:', error));

		res.clearCookie('anonymousId');
		res
			.json({
				message: 'Confirmed booking successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send({ message: error, status: false });
	}
};
