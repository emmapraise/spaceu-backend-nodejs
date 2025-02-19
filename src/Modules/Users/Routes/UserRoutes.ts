import express, { Router } from 'express';
import { indexHandler } from '../Controller/UserController';
import { userRequest } from '../Validators/UserValidator';

const router = Router();

router.get('/', indexHandler);

export default router;