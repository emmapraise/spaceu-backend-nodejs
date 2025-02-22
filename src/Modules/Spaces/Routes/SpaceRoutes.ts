import { Router } from 'express';
import {
	createSpaceHandler,
	createSpaceOnlyHandler,
	getSpacesHandler,
	getSpaceHandler,
	dropDownHandler,
} from '../Controller/SpaceController';
import {
	createSpaceRequest,
	createSpaceOnlyRequest,
	getSpaceRequest,
} from '../Validators/SpaceValidator';
import { packageRequest } from '../Validators/PackageValidator';
import { createPackageHandler } from '../Controller/PackageController';

const router = Router();

router.get('/', getSpacesHandler);
router.get('/drop-down', dropDownHandler);
router.get('/:id', getSpaceRequest, getSpaceHandler);

router.post('/all', createSpaceRequest, createSpaceHandler);
router.post('/', createSpaceOnlyRequest, createSpaceOnlyHandler);

router.post('/:space_id/packages', packageRequest, createPackageHandler);

export default router;
