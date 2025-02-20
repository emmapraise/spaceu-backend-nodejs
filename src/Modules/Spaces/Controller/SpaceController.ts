import { Response, Request } from 'express';
import { createSpace, createSpaceOnly, indexModel } from '../Model/SpaceModel';

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
		res.json(result).status(200);
	} catch (error: any) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

export const getSpacesHandler = async (req: Request, res: Response) => {
	try {
		const result = await indexModel();
		res.json(result).status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};
