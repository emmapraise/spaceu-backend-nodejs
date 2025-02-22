import { Response, Request } from 'express';
import upload from '../../../Libs/Middleware/multer';
import { uploadToCloudinary } from '../../../Libs/Utils/uploadHelper';
import {
	createMedia,
	indexModel,
	findMediaById,
	findMediaByPublicId,
} from '../Model/MediaModel';

export const uploadMedia = async (req: any, res: Response) => {
	try {
		const uploadedResult = await uploadToCloudinary(req, res);
		const result = await createMedia(uploadedResult);
		res
			.json({ message: 'Upload successful', status: true, data: result })
			.status(201);
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

export const getMedia = async (req: Request, res: Response) => {
	try {
		const result = await indexModel();
		res.json(result).status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getMediaById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await findMediaById(parseInt(id));
		res.json(result).status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};

export const getMediaByPublicId = async (req: Request, res: Response) => {
	try {
		const { public_id } = req.params;
		const result = await findMediaByPublicId(public_id);
		res.json(result).status(200);
	} catch (error) {
		res.status(500).send('Server Error');
	}
};
