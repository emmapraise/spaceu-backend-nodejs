import { body, param, query } from 'express-validator';
import Validator from '../../../Libs/Middleware/Validator';

export const userRule = [
	body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name must not be empty'),
	body('email').isEmail().withMessage('Email must be a valid email').notEmpty().withMessage('Email must be a valid email'),
	// body('password').isString().withMessage('Password must be a string'),
	// body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
	body('phone_number')
		.isLength({ min: 11 })
		.withMessage('Phone number must be at least 11 characters long').notEmpty().withMessage('Phone number must be at least 11 characters long'),
	body('whatsapp_number')
		.isLength({ min: 11 })
		.withMessage('Phone number must be at least 11 characters long').optional(),
];

export const userRequest = Validator(userRule);
