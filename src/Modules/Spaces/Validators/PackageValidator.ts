import { body, param, query } from 'express-validator';
import Validator from '../../../Libs/Middleware/Validator';

const packageRule = [
	param('id').isInt().notEmpty().withMessage('space_id must not be empty'),
	body('name').notEmpty().withMessage('Name must not be empty'),
	body('description')
		.optional()
		.isString()
		.withMessage('Description must not be empty'),
	body('price').isNumeric().withMessage('Price must be a number'),
	body('type')
		.notEmpty()
		.withMessage('Type must not be empty')
		.isIn(['hourly', 'half-day', 'full-day']),

	body('package_offer')
		.isArray({ min: 1 })
		.withMessage('Package offer must be an array'),
	body('package_offer.*.offer')
		.notEmpty()
		.withMessage('Offer must not be empty'),
];

const updatePackageRule = [
	...packageRule,
	body('id').notEmpty().withMessage('ID must not be empty'),
];

export const packageRequest = Validator(packageRule);
