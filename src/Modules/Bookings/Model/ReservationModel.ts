import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';

export const indexModel = async () => {
	return await prisma.reservation.findMany();
};

export const createReservation = async (data: any) => {
	const { package_id, space_id, booking_id, ...result } = data;
	return await prisma.reservation.create({
		data: {
			...result,
			package: package_id ? { connect: { id: package_id } } : undefined,
			space: space_id ? { connect: { id: space_id } } : undefined,
		},
	});
};

export const updateReservation = async (
	id: number,
	data: Prisma.ReservationUpdateInput
) => {
	return await prisma.reservation.update({ where: { id }, data });
};

export const deleteReservation = async (id: number) => {
	return await prisma.reservation.delete({ where: { id } });
};

export const findReservationById = async (id: number) => {
	return await prisma.reservation.findUnique({
		where: { id },
		include: {
			package: true,
			space: true,
			booking: true,
		},
	});
};

export const getResverationByBookingId = async (booking_id: number) => {
	return await prisma.reservation.findMany({
		where: { booking_id },
		include: {
			package: true,
			space: true,
			booking: true,
		},
	});
};

export const getResverationBySpaceId = async (space_id: number) => {
	return await prisma.reservation.findMany({
		where: { space_id },
		include: {
			package: true,
			space: true,
			booking: true,
		},
	});
};
