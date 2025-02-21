import { Request, Response } from 'express';
import upload from '../Middleware/multer';
import cloudinary from './uploadMedia';

export const handleFileUpload = (
    req: Request,
    res: Response
): Promise<string> => {
    return new Promise((resolve, reject) => {
        upload.single('file')(req, res, (err: any) => {
            if (err) {
                reject({ status: 400, message: err.message });
            } else if (!req.file) {
                reject({ status: 400, message: 'No file uploaded' });
            } else {
                resolve(req.file.path);
            }
        });
    });
};

export const uploadToCloudinary = async (req: Request, res: Response) => {
    const filePath = await handleFileUpload(req, res);
    // console.log(filePath);

    return await cloudinary.uploader.upload(filePath, {
        folder: 'spaceU',
        // public_id: 'dhnlhnfdnhlndh',
        fetch_format: 'auto',
        quality: 'auto',
        tags: ['space'],
    });
};