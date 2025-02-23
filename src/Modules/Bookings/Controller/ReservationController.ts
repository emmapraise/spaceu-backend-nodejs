import { Request, Response } from 'express';
import {
	createReservation,
	indexModel,
	findReservationById,
	getResverationByBookingId,
	getReservedSpaceModel,
	getReservationBySpaceId,
} from '../Model/ReservationModel';

export const createReservationHandler = async (req: Request, res: Response) => {
	try {
		const validatedRecord = req.validated();
		const result = await createReservation(validatedRecord);
		res
			.json({
				message: 'Created reservation successfully',
				status: true,
				data: result,
			})
			.status(201);
	} catch (error: any) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

export const getReservationsHandler = async (req: Request, res: Response) => {
	try {
		const result = await indexModel();
		res
			.json({
				message: 'Got reservation successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getReservationHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await findReservationById(parseInt(id));
		res
			.json({
				message: 'Got reservation successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getReservationByBookingIdHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { booking_id } = req.params;
		const result = await getResverationByBookingId(parseInt(booking_id));
		res
			.json({
				message: 'Got reservation successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getReservationBySpaceIdHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { space_id } = req.params;
		const result = await getReservationBySpaceId(parseInt(space_id));
		res
			.json({
				message: 'Got reservation successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getReservationBySpaceAndDateHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const data = req.validated();
		const result = await getReservedSpaceModel(data);
		res
			.json({
				message: 'Got reservation successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error: any) {
		res
			.status(500)
			.json({ message: 'Server Error', error: error.message, status: false });
	}
};
