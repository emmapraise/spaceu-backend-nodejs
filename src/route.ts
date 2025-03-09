import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UserRoutes from './Modules/Users/Routes/UserRoutes';
import SpaceRoutes from './Modules/Spaces/Routes/SpaceRoutes';
import MediaRoutes from './Modules/Media/Routes/MediaRoutes';
import ReservationRoutes from './Modules/Bookings/Routes/ReservationRoutes';
import BookingRoutes from './Modules/Bookings/Routes/BookingRoutes';
// import { sendEmail } from './Libs/Utils/EmailHelper';

const app = express();
app.use(express.json());

app
	.use(express.static(__dirname + '/public'))
	.use(cors())
	.use(cookieParser());

app.get('/', (req, res) => {
	res.send('Backend is running');
});
app.get('/api', (req, res) => {
	res.send('API is running');
});

// app.get('/api/mail', (req, res) => {
// 	sendEmail('tosin.noel@getnada.com', 'Test Email', 'Hello from Node.js!');
// 	res.send('Email sent');
// });

app.use('/api/users', UserRoutes);
app.use('/api/spaces', SpaceRoutes);
app.use('/api/media', MediaRoutes);
app.use('/api/reservations', ReservationRoutes);
app.use('/api/bookings', BookingRoutes);

export default app;
