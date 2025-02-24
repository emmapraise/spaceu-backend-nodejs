import { body, param, query } from 'express-validator';
import Validator, { packageExists, spaceExists } from '../../../Libs/Middleware/Validator';
import { TimeSlotEnum } from '../../../Libs/Constant/TimeConstant';

const allowedTime = Object.values(TimeSlotEnum);

const reservationRule = [
	body('id').optional().isInt().withMessage('Id must be a number'),
	body('space_id').notEmpty().withMessage('Space id must not be empty').custom(spaceExists),
	body('package_id')
		.optional()
		.isInt()
		.withMessage('Package id must be a number').custom(packageExists),
	body('start_time')
		.notEmpty()
		.withMessage('Start time must not be empty')
		.isIn(allowedTime)
		.withMessage('Invalid start time'),
	body('end_time')
		.optional()
		.isIn(allowedTime)
		.withMessage('End time must not be empty'),
	body('date')
		.notEmpty()
		.withMessage('Date must not be empty')
		.isISO8601()
		.withMessage('Invalid date format. Use YYYY-MM-DD'),
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

const getReservationRule = [
	query('space_id').notEmpty().custom(spaceExists),
	query('date').notEmpty().isISO8601(),
];

export const createReservationRequest = Validator(reservationRule);
export const spaceIdRequest = Validator([
	param('space_id').isInt().withMessage('Space id must be a number'),
]);
export const getReservationRequest = Validator(getReservationRule);
