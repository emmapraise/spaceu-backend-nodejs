import { Request, Response } from 'express';
import {
	createUser,
	deleteUser,
	indexModel,
	updateUser,
    findUserById
} from '../Model/UserModel';

export const indexHandler = async (req: Request, res: Response) => {
	try {
		const result: any = await indexModel();
		res.json(result).status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const createHandler = async (req: Request, res: Response) => {
	try {
		const data = req.validated();
		const result = await createUser(data);
		res.json(result).status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const updateHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const data = req.validated();
		const result = await updateUser(parseInt(id), data);
		res.json(result).status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const deleteHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await deleteUser(parseInt(id));
		res.json(result).status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getOneUserHandler = async (req: Request, res:Response) => {
    try {
        const { id } = req.validated();
        const result = await findUserById(parseInt(id));
        res.json(result).status(200);
    } catch (error) {
        res.status(500).send('Server Error');
    }
}