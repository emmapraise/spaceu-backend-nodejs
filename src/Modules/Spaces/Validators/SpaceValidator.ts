import { body, param, query } from 'express-validator';
import Validator from '../../../Libs/Middleware/Validator';

const createSpaceRule = [
	body('name').notEmpty().withMessage('Name must not be empty'),
	body('description').notEmpty().withMessage('Description must not be empty'),
	body('package').isArray({ min: 1 }).withMessage('Package must be an array'),
	body('package.*.name')
		.notEmpty()
		.trim()
		.escape()
		.withMessage('Package name must not be empty'),
	body('package.*.price')
		.notEmpty()
		.isFloat()
		.withMessage('Package price must not be empty'),
	body('package.*.description')
		.optional()
		.isString()
		.trim()
		.escape()
		.withMessage('Package description must not be empty'),
	body('package.*.type')
		.notEmpty()
		.withMessage('Package type must not be empty')
		.isString()
		.isLowercase()
		.isIn(['hourly', 'half-day', 'full-day'])
		.withMessage('Package type must be either hourly, half-day, or full-day'),
	body('package.*.package_offer')
		.isArray()
		.withMessage('Package offer must be an array'),
	body('package.*.package_offer.*.offer')
		.notEmpty()
		.isString()
		.withMessage('Offer must not be empty'),
];

export const createSpaceRequest = Validator(createSpaceRule);
