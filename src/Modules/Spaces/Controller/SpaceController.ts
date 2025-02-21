import { Response, Request } from 'express';
import {
	createSpace,
	createSpaceOnly,
	indexModel,
	findSpaceById,
	dropDownModel,
} from '../Model/SpaceModel';

export const createSpaceHandler = async (req: Request, res: Response) => {
	try {
		const validatedRecord = req.validated();
		// console.log(validatedRecord)
		const result = await createSpace(validatedRecord);
		res.json(result).status(200);
	} catch (error: any) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

export const createSpaceOnlyHandler = async (req: Request, res: Response) => {
	try {
		const validatedRecord = req.validated();
		const result = await createSpaceOnly(validatedRecord);
		res
			.json({
				messgae: 'Created space successfully',
				status: true,
				data: result,
			})
			.status(201);
	} catch (error: any) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

export const getSpacesHandler = async (req: Request, res: Response) => {
	try {
		const result = await indexModel();
		res
			.json({
				messgae: 'Got space successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getSpaceHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await findSpaceById(parseInt(id));
		res
			.json({
				messgae: 'Got space successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const dropDownHandler = async (req: Request, res: Response) => {
	try {
		const result = await dropDownModel();
		res
			.json({
				messgae: 'Got space successfully',
				status: true,
				data: result,
			})
			.status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};
