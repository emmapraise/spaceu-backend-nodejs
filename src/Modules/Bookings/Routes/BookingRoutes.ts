import { Router } from 'express';
import {
	createBookingHandler,
	getBookingsHandler,
	getBookingByIdHandler,
	getBookingsByUserIdHandler,
	confirmBookingHandler,
} from '../Controller/BookingController';
import {
	bookingRequest,
	confirmBookingRequest,
	getBookingRequest,
	getUserBookingRequest,
} from '../Validator/BookingValidator';
import { generateAnonymousId } from '../../../Libs/Middleware/anonymousSignIn';

const router = Router();

router.get('/', getBookingsHandler);
router.get('/confirm-booking', confirmBookingRequest, confirmBookingHandler);

router.get('/:id', getBookingRequest, getBookingByIdHandler);
router.get('/user/:user_id', getUserBookingRequest, getBookingByIdHandler);
router.post('/', generateAnonymousId, bookingRequest, createBookingHandler);

export default router;
