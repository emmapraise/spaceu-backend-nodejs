import { Router } from 'express';
import { uploadMedia } from '../Controller/MediaController';

const router = Router();
router.post('/upload', uploadMedia);
// router.delete('/delete', deleteMedia);
export default router;
