import { body, param, query } from 'express-validator';
import Validator, {
	checkValidDate,
	endTime,
	endTimeCheck,
	packageExists,
	reservationExists,
	spaceExists,
	startTime,
	startTimeCheck,
} from '../../../Libs/Middleware/Validator';
import { TimeSlotEnum } from '../../../Libs/Constant/TimeConstant';

const allowedTime = Object.keys(TimeSlotEnum);

const reservationRule = [
	body('id')
		.optional()
		.isInt()
		.withMessage('Id must be a number')
		.custom(reservationExists),
	body('space_id')
		.notEmpty()
		.withMessage('Space id must not be empty')
		.custom(spaceExists),
	body('package_id')
		.optional()
		.isInt()
		.withMessage('Package id must be a number')
		.custom(packageExists),
	body('start_time')
		.notEmpty()
		.withMessage('Start time must not be empty')
		.isIn(allowedTime)
		.withMessage('Invalid start time')
		.customSanitizer(startTime)
		.custom(startTimeCheck),
	body('end_time').customSanitizer(endTime).custom(endTimeCheck),
	body('date')
		.notEmpty()
		.withMessage('Date must not be empty')
		.isISO8601()
		.withMessage('Invalid date format. Use YYYY-MM-DD')
		.custom(checkValidDate),
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
export const deleteReservationRequest = Validator([
	param('id')
		.isInt()
		.withMessage('Id must be a number')
		.custom(reservationExists),
]);
