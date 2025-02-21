import { Response, Request } from 'express';
import upload from '../../../Libs/Middleware/multer';
import cloudinary from '../../../Libs/Utils/uploadMedia';

export const uploadMedia = async (req: any, res: Response) => {
	try {
		upload.single('file')(req, res, async (err: any) => {
			if (err) {
				return res.status(400).json({ message: err.message });
			}
			const result = await cloudinary.uploader.upload(req.file.path, {
				folder: 'spaceU',
				fetch_format: 'auto',
				quality: 'auto',
			});
			res.json(result).status(200);
		});
	} catch (error: any) {
		res.status(500).json({ message: 'Server Error', error: error.message });
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
