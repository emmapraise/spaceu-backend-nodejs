import cron from 'node-cron';
import { deleteReservationCronJob } from '../../Modules/Bookings/Model/ReservationModel';

export const reservationCron = cron.schedule('*/30 * * * *', () => {
    deleteReservationCronJob();
    console.log("Cron scheduled");
});
