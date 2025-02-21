import { Router } from 'express';
import {
	uploadMedia,
	getMedia,
	getMediaById,
	getMediaByPublicId,
} from '../Controller/MediaController';
import { mediaRequest } from '../Validator/MediaValidator';

const router = Router();
router.post('/', uploadMedia);

router.get('/', getMedia);
router.get('/:id', getMediaById);
router.get('/public_id/:public_id', getMediaByPublicId);

export default router;
