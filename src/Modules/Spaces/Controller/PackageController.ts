import { Request, Response } from 'express';
import { createPackage } from '../Model/PackageModel';

export const createPackageHandler = async (req: Request, res: Response) => {
	try {
		const validatedRecord = req.validated();
		const result = await createPackage(validatedRecord);
		res.json(result).status(200);
	} catch (error: any) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};
