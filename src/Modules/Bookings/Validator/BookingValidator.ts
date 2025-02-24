import { body, param } from 'express-validator';
import { userRule } from '../../Users/Validators/UserValidator';
import Validator from '../../../Libs/Middleware/Validator';

const bookingRule = [
	...userRule,
	body('total_amount').notEmpty().isFloat(),
	body('reservations').isArray({ min: 1 }),
	body('reservations.*.id').notEmpty().isInt(),
];

const getBookingRule = [param('id').notEmpty().isInt()];

const getUserBookingRule = [param('user_id').notEmpty().isInt()];

export const bookingRequest = Validator(bookingRule);
export const getBookingRequest = Validator(getBookingRule);
export const getUserBookingRequest = Validator(getUserBookingRule);
