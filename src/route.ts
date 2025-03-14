import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoutes from './Modules/Users/Routes/UserRoutes';
import SpaceRoutes from './Modules/Spaces/Routes/SpaceRoutes';
import MediaRoutes from './Modules/Media/Routes/MediaRoutes';
import ReservationRoutes from './Modules/Bookings/Routes/ReservationRoutes';
import BookingRoutes from './Modules/Bookings/Routes/BookingRoutes';
// import { sendEmail } from './Libs/Utils/EmailHelper';
require('dotenv').config();

const allowedOrigins =
	(process.env.ALLOWED_ORIGINS || 'http://localhost:8080').split(',');

const app = express();
app.use(express.json());

app
	.use(express.static(__dirname + '/public'))
	.use(
		cors({
			origin: (origin, callback) => {
				// Allow requests with no origin (e.g., mobile apps, curl requests)
				if (!origin) return callback(null, true);

				// Check if the origin is in the allowed list
				if (allowedOrigins.includes(origin)) {
					return callback(null, true);
				} else {
					return callback(new Error('Not allowed by CORS'));
				}
			},
			credentials: true, // Allow cookies
		})
	)
	.use(cookieParser());

app.get('/', (req, res) => {
	res.send('Backend is running');
});
app.get('/api', (req, res) => {
	res.send('API is running');
});

app.use('/api/users', UserRoutes);
app.use('/api/spaces', SpaceRoutes);
app.use('/api/media', MediaRoutes);
app.use('/api/reservations', ReservationRoutes);
app.use('/api/bookings', BookingRoutes);

export default app;
