import { Request, Response } from 'express';

import {
	createBooking,
	indexModel,
	findBookingById,
	findBookingByUserId,
} from '../Model/BookingModel';

export const createBookingHandler = async (req: Request, res: Response) => {
	try {
		const validatedRecord = req.validated();
		const result = await createBooking(validatedRecord);
		res
			.json({
				message: 'Created booking successfully',
				status: true,
				data: result,
			})
			.status(201);
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

