import { Request, Response } from 'express';
import { createUser, indexModel } from '../Model/UserModel';

export const indexHandler = async (req: Request, res: Response) => {
    try{
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