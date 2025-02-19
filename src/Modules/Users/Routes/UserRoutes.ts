import express, { Router } from 'express';
import { createHandler, indexHandler } from '../Controller/UserController';
import { userRequest } from '../Validators/UserValidator';

const router = Router();

router.get('/', indexHandler);
router.post('/', userRequest, createHandler);

export default router;