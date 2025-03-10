import express, { Router } from 'express';
import {
	createHandler,
	deleteHandler,
	indexHandler,
	updateHandler,
    getOneUserHandler,
	contactUsHandler
} from '../Controller/UserController';
import { contactUsRequest, updateUserRequest, userIdRequest, userRequest } from '../Validators/UserValidator';

const router = Router();

router.get('/', indexHandler);
router.post('/', userRequest, createHandler);
router.get('/:id', userIdRequest, getOneUserHandler);
router.put('/:id', updateUserRequest, updateHandler);
router.delete('/:id', userIdRequest, deleteHandler);
router.post('/contact-us', contactUsRequest, contactUsHandler)

export default router;
