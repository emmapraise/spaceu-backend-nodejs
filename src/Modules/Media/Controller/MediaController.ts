import { Response, Request } from 'express';
import upload from '../../../Libs/Middleware/multer';
import {
	handleFileUpload,
	uploadToCloudinary,
} from '../../../Libs/Utils/uploadHelper';

export const uploadMedia = async (req: any, res: Response) => {
	try {
        
		const result = await uploadToCloudinary(req, res);
		res.json(result).status(200);
	} catch (error: any) {
		if (error.status) {
			res.status(error.status).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Server Error', error: error.message });
		}
	}
};

// export const deleteMedia = async (req: any, res: Response) => {
//     try {
//         const { public_id } = req.body;
//         const result = await cloudinary.uploader.destroy(public_id);
//         res.json(result).status(200);
//     } catch (error: any) {
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };
