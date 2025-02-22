import { body, param } from 'express-validator';
import Validator from '../../../Libs/Middleware/Validator';

const reservationRule = [
	body('space_id').notEmpty().withMessage('Space id must not be empty'),
	body('package_id')
		.optional()
		.isInt()
		.withMessage('Package id must be a number'),
	body('time').notEmpty().withMessage('Start time must not be empty'),
	body('date').notEmpty().withMessage('Date must not be empty'),
	body('duration')
		.notEmpty()
		.withMessage('Status must not be empty')
		.isInt()
		.withMessage('Duration must be a number'),
	body('price')
		.notEmpty()
		.withMessage('Price must not be empty')
		.isFloat()
		.withMessage('Price must be a number'),
];

export const createReservationRequest = Validator(reservationRule);
export const spaceIdRequest = Validator([
	param('space_id').isInt().withMessage('Space id must be a number'),
]);
