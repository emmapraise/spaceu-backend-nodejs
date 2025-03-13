import e, { Request, Response } from 'express';
import {
	MatchedDataOptions,
	matchedData,
	validationResult,
} from 'express-validator';
import prisma from '../../../prisma/db';
import { TimeSlotEnum } from '../Constant/TimeConstant';
import { calculateEndTime } from '../Utils/ReservationHelper';

declare global {
	namespace Express {
		interface Request {
			validated: (
				options?: Partial<MatchedDataOptions>
			) => Record<string, any> | any;
		}
	}
}

const Validator = (validations: Array<any>) => {
	return async (req: Request, res: Response, next: any) => {
		for (let validation of validations) {
			await validation.run(req);
		}

		const result = validationResult(req);
		if (req.header('x-precognition')) {
			const data = result.array().map((error: any) => {
				if (error.param === 'email') {
					return error;
				}

				return null;
			});
			data.filter((error: any) => error !== null);

			return res.status(200).json({
				status: true,
				message: 'Validation successful.',
			});
		}

		if (result.isEmpty()) {
			req.validated = (options?: Partial<MatchedDataOptions>) => {
				return matchedData(req, options);
			};
			return next();
		}

		return res.status(422).json({
			status: false,
			message: 'Fill all the required fields',
			errors: result.array(),
		});
	};
};

export const spaceExists = async (value: any, { req }: { req: any }) => {
	const space = await prisma.space.findFirst({
		where: {
			id: Number(value),
		},
	});
	if (!space) {
		throw new Error('Space does not exist');
	}
	return true;
};

export const mediaExist = async (value: any, { req }: { req: any }) => {
	const media = await prisma.media.findFirst({
		where: {
			id: Number(value),
		},
	});
	if (!media) {
		throw new Error('Media does not exist');
	}
	return true;
};

export const packageExists = async (value: any, { req }: { req: any }) => {
	const packageData = await prisma.package.findFirst({
		where: {
			id: Number(value),
		},
	});
	if (!packageData) {
		throw new Error('Package does not exist');
	}
	return true;
};

export const reservationExists = async (value: any, { req }: { req: any }) => {
	const reservation = await prisma.reservation.findFirst({
		where: {
			id: Number(value),
		},
	});
	if (!reservation) {
		throw new Error('Reservation does not exist');
	}
	return true;
};

export const startTime = async (value: any, { req }: { req: any }) => {
	return Number(TimeSlotEnum[value]);
};

export const startTimeCheck = async (value: any, { req }: { req: any }) => {
	if (value < TimeSlotEnum._8AM || value >= TimeSlotEnum._6PM) {
		throw new Error(
			'Start time cannot be earlier than 8 AM or later than 6 PM'
		);
	}
	return true;
};

export const endTime = async (value: any, { req }: { req: any }) => {
	const { start_time, duration } = req.body;
	return calculateEndTime(start_time, duration);
};

export const endTimeCheck = async (value: any, { req }: { req: any }) => {
	if (value > TimeSlotEnum._6PM || value <= TimeSlotEnum._8AM) {
		throw new Error('End time cannot be earlier than 8 AM or later than 6 PM');
	}
	return true;
};

export const checkValidDate = async (value: any, { req }: { req: any }) => {
    const selectedDate = new Date(value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        throw new Error('You can\'t pick a date in the past.');
    }
    return true;
};

export const checkBookingReference = async (
	value: any,
	{ req }: { req: any }
) => {
	const booking = await prisma.booking.findFirst({
		where: {
			references: value,
		},
	});
	if (!booking) {
		throw new Error(`Booking with reference ${value} not found`);
	}
	return true;
};
export default Validator;
