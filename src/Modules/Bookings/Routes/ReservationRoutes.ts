import { Router } from 'express';
import {
	createReservationHandler,
	getReservationsHandler,
	getReservationHandler,
	getReservationBySpaceIdHandler,
	getReservationByBookingIdHandler,
} from '../Controller/ReservationController';
import {
	createReservationRequest,
	spaceIdRequest,
} from '../Validator/ReservationValidator';

const router = Router();

router.get('/', getReservationsHandler);

router.get('/space/:id', spaceIdRequest, getReservationBySpaceIdHandler);
router.get(
	'/booking/:booking_id',
	spaceIdRequest,
	getReservationByBookingIdHandler
);
router.post('/', createReservationRequest, createReservationHandler);

export default router;
