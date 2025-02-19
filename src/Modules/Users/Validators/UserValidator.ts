import { body, param, query } from 'express-validator';
export const userRequest = [
	body('name').isString().withMessage('Name must be a string'),
	body('email').isEmail().withMessage('Email must be a valid email'),
	// body('password').isString().withMessage('Password must be a string'),
	// body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
	body('phone_number')
		.isLength({ min: 11 })
		.withMessage('Phone number must be at least 11 characters long'),
	body('whatsapp_number')
		.isLength({ min: 11 })
		.withMessage('Phone number must be at least 11 characters long'),
];
