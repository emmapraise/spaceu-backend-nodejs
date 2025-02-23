import multer from 'multer';
import path from 'path';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB


const storage = multer.diskStorage({
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: MAX_FILE_SIZE },
	fileFilter: (req, file, cb) => {
		const allowedTypes = /jpeg|jpg|png/;
		const extname = allowedTypes.test(
			path.extname(file.originalname).toLowerCase()
		);

		const mimetype = allowedTypes.test(file.mimetype);

		if (extname && mimetype) {
			return cb(null, true);
		} else {
			return cb(new Error('Only images are allowed!'));
		}
	},
});

export default upload;
