import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';
import { upsertUserByEmail } from '../../Users/Model/UserModel';

export const indexModel = async () => {
	return await prisma.booking.findMany();
};

export const createBooking = async (
	user: any,
	reservations: any,
	total_amount: number,
	anonymous_id: string
) => {
	return await prisma.booking.create({
		data: {
			user: { connect: { id: user.id } },
			total_amount,
			anonymous_id,
			reservations: {
				connect: reservations.map((reservation: any) => ({
					id: reservation.id,
				})),
			},
		},
	});
};

export const updateBooking = async (
	id: number,
	data: Prisma.BookingUpdateInput
) => {
	return await prisma.booking.update({ where: { id }, data });
};

export const deleteBooking = async (id: number) => {
	return await prisma.booking.delete({ where: { id } });
};

export const findBookingById = async (id: number) => {
	return await prisma.booking.findUnique({ where: { id } });
};

export const findBookingByUserId = async (userId: number) => {
	return await prisma.booking.findMany({ where: { user: { id: userId } } });
};

export const getBookingByAnonymousId = async(anonymous_id:string) => {
	return prisma.booking.findFirst({
		where: { anonymous_id },
        include: {
            user: true,
            reservations: {
                include: {
                    package: true,
                    space: true,
                    booking: true,
                },
            },
        },
	})
};