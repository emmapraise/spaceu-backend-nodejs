import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const allowedTypes = /jpeg|jpg|png/;
		const extname = allowedTypes.test(
			path.extname(file.originalname).toLowerCase()
		);
        console.log(file.originalname);

		const mimetype = allowedTypes.test(file.mimetype);

		if (extname && mimetype) {
			return cb(null, true);
		} else {
			return cb(new Error('Only images are allowed!'));
		}
	},
});

export default upload;
