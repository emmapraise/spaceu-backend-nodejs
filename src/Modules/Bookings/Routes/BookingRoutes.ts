import { Router } from 'express';
import {
	createBookingHandler,
	getBookingsHandler,
	getBookingByIdHandler,
	getBookingsByUserIdHandler,
} from '../Controller/BookingController';
import {
	bookingRequest,
	getBookingRequest,
	getUserBookingRequest,
} from '../Validator/BookingValidator';
import { generateAnonymousId } from '../../../Libs/Middleware/anonymousSignIn';

const router = Router();

router.get('/', getBookingsHandler);
router.get('/:id', getBookingRequest, getBookingByIdHandler);
router.get('/user/:user_id', getUserBookingRequest, getBookingByIdHandler);
router.post('/', generateAnonymousId, bookingRequest, createBookingHandler);

export default router;
