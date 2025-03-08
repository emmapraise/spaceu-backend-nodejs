import { body, param, query } from 'express-validator';
import { userRule } from '../../Users/Validators/UserValidator';
import Validator, {
	checkBookingReference,
} from '../../../Libs/Middleware/Validator';

const bookingRule = [...userRule];
const confirmRule = [
	query('reference')
		.notEmpty()
		.withMessage('Please enter a reference')
		.custom(checkBookingReference),
];
const getBookingRule = [param('id').notEmpty().isInt()];

const getUserBookingRule = [param('user_id').notEmpty().isInt()];

export const bookingRequest = Validator(bookingRule);
export const getBookingRequest = Validator(getBookingRule);
export const getUserBookingRequest = Validator(getUserBookingRule);
export const confirmBookingRequest = Validator(confirmRule);
