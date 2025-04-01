import { Router } from 'express';
import {
	createReservationHandler,
	getReservationsHandler,
	// getReservationHandler,
	getReservationBySpaceIdHandler,
	getReservationByBookingIdHandler,
	getReservationBySpaceAndDateHandler,
	getAnonymousReservationsHandler,
	deleteReservationHandler,
} from '../Controller/ReservationController';
import {
	createReservationRequest,
	spaceIdRequest,
	getReservationRequest,
	deleteReservationRequest,
} from '../Validator/ReservationValidator';

import { generateAnonymousId } from '../../../Libs/Middleware/anonymousSignIn';

const router = Router();

router.get('/all', generateAnonymousId, getReservationsHandler);

router.get('/space/:id', spaceIdRequest, getReservationBySpaceIdHandler);
router.get(
	'/booking/:booking_id',
	spaceIdRequest,
	getReservationByBookingIdHandler
);
router.post(
	'/',
	generateAnonymousId,
	createReservationRequest,
	createReservationHandler
);

router.get(
	'/get-reserved',
	getReservationRequest,
	getReservationBySpaceAndDateHandler
);

router.get('/', generateAnonymousId, getAnonymousReservationsHandler);
router.delete('/:id', deleteReservationRequest, deleteReservationHandler);

export default router;
