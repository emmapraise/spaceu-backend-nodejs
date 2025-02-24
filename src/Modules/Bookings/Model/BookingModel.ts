import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';
import { upsertUserByEmail } from '../../Users/Model/UserModel';

export const indexModel = async () => {
	return await prisma.booking.findMany();
};

export const createBooking = async (data: any) => {
	const { total_amount, reservations, ...user } = data;

	const userData = await upsertUserByEmail(user);
	return await prisma.booking.create({
		data: {
			user: { connect: { id: userData.id } },
			total_amount,
			reservations: {
				connect: reservations.map((id: number) => ({ id })),
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
