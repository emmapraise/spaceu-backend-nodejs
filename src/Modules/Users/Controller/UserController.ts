import { Request, Response } from 'express';
import { indexModel } from '../Model/UserModel';

export const indexHandler = async (req: Request, res: Response) => {
    try{
        const result: any = await indexModel();
	    res.json(result).status(200);
        
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// app.use(express.json());

// app.get('/', (req, res) => {
// 	try {
// 		res.json({"message": "This is live!"});
// 	} catch (error) {
// 		res.status(500).send('server error');
// 	}
// });

// app.get('/users', async (req, res) => {
// 	try {
// 		const users = await prisma.user.findMany();
// 		res.json(users);
// 	} catch (error) {
// 		res.status(500).send('Server Error');
// 	}
// });

// app.post('/users', async (req, res) => {
// 	const { name, email } = req.body;
// 	try {
// 		const user = await prisma.user.create({
// 			data: { name, email },
// 		});
// 		res.json(user);
// 	} catch (error) {
// 		res.status(500).send('Server Error');
// 	}
// });
