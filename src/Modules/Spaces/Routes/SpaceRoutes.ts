import { Router } from 'express';
import {
	createSpaceHandler,
	createSpaceOnlyHandler,
    getSpacesHandler,
} from '../Controller/SpaceController';
import {
	createSpaceRequest,
	createSpaceOnlyRequest,
} from '../Validators/SpaceValidator';
import { packageRequest } from '../Validators/PackageValidator';
import { createPackageHandler } from '../Controller/PackageController';

const router = Router();

router.get('/', getSpacesHandler);

router.post('/', createSpaceRequest, createSpaceHandler);
router.post('/only', createSpaceOnlyRequest, createSpaceOnlyHandler);

router.post('/:space_id/packages', packageRequest, createPackageHandler);

export default router;
