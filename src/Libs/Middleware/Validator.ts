import e, { Request, Response } from 'express';
import {
	MatchedDataOptions,
	matchedData,
	validationResult,
} from 'express-validator';
import prisma from '../../../prisma/db';

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
	const space = await prisma.space.findFirst(value);
	if (!space) {
		throw new Error('Space does not exist');
	}
	return true;
};

export const mediaExist = async (value: any, { req }: { req: any }) => {
	const media = await prisma.media.findFirst(value);
	if (!media) {
		throw new Error('Media does not exist');
	}
	return true;
};

export const packageExists = async (value: any, { req }: { req: any }) => {
	const packageData = await prisma.package.findFirst(value);
	if (!packageData) {
		throw new Error('Package does not exist');
	}
	return true;
};

export const reservationExists = async (value: any, { req }: { req: any }) => {
	const reservation = await prisma.reservation.findFirst(value);
	if (!reservation) {
		throw new Error('Reservation does not exist');
	}
	return true;
};

export default Validator;
