import { body, param, query } from 'express-validator';
import Validator, { mediaExist } from '../../../Libs/Middleware/Validator';

const spaceRule = [
	body('name').notEmpty().withMessage('Name must not be empty'),
	body('description').notEmpty().withMessage('Description must not be empty'),
	body('type')
		.notEmpty()
		.withMessage('Type must not be empty')
		.isIn(['space', 'service'])
		.default('space'),
	body('parent_space_id')
		.optional()
		.isInt()
		.withMessage('Parent space id must be a number'),
	body('hero_video_url')
		.optional()
		.isString().isURL()
		.withMessage('Hero video id must be a number'),
	body('headline')
		.optional()
		.isString()
		.withMessage('Headline must be a string'),
	body('sub_title')
		.optional()
		.isString()
		.withMessage('Description must be a string'),
	body('spotlight_image_id')
		.optional()
		.isInt()
		.withMessage('Spotlight image id must be a number').custom(mediaExist),
	body('spotlight_headline')
		.optional()
		.isString()
		.withMessage('Spotlight headline must be a string'),
	body('spotlight_description')
		.optional()
		.isString()
		.withMessage('Spotlight description must be a string'),
	body('images').optional().isArray().withMessage('Images must be an array'),
	body('images.*.id')
		.optional()
		.isInt()
		.withMessage('Image id must be a number').custom(mediaExist),
];
const createSpaceRule = [
	...spaceRule,
	body('packages').isArray({ min: 1 }).withMessage('Package must be an array'),
	body('packages.*.name')
		.notEmpty()
		.trim()
		.escape()
		.withMessage('Package name must not be empty'),
	body('packages.*.price')
		.notEmpty()
		.isFloat()
		.withMessage('Package price must not be empty'),
	body('packages.*.description')
		.optional()
		.isString()
		.trim()
		.escape()
		.withMessage('Package description must not be empty'),
	body('packages.*.type')
		.notEmpty()
		.withMessage('Package type must not be empty')
		.isString()
		.isLowercase()
		.isIn(['hourly', 'half-day', 'full-day'])
		.withMessage('Package type must be either hourly, half-day, or full-day'),
	// body('packages.*.package_offer')
	// 	.isArray()
	// 	.withMessage('Package offer must be an array'),
	// body('packages.*.package_offer.*.offer')
	// 	.notEmpty()
	// 	.isString()
	// 	.withMessage('Offer must not be empty'),
];

const spaceIdRule = [param('id').isInt().withMessage('Id must be a number')];

export const createSpaceRequest = Validator(createSpaceRule);
export const createSpaceOnlyRequest = Validator(spaceRule);
export const getSpaceRequest = Validator(spaceIdRule);
export const updateSpaceRequest = Validator([...spaceIdRule, ...spaceRule]);
