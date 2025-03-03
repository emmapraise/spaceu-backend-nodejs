import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

declare module 'express' {
	interface Request {
		anonymous_id?: string;
	}
}

export const generateAnonymousId = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.cookies.anonymousId) {
		const anonymousId = uuidv4(); // Generate a unique ID
		res.cookie('anonymousId', anonymousId, {
			maxAge: 6 * 60 * 1000,
		}); 
		req.anonymous_id = anonymousId;
	} else {
		req.anonymous_id = req.cookies.anonymousId;
	}
	next();
};
