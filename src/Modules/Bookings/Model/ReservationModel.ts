import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';

export const indexModel = async () => {
	return await prisma.reservation.findMany();
};

export const createReservation = async (data: any, anonymousId: string) => {
	const { package_id, space_id, booking_id, date, id, ...result } = data;

	const payloadData = {
		...result,
		anonymous_id: anonymousId,
		date: new Date(date),
		package: package_id ? { connect: { id: package_id } } : undefined,
		space: space_id ? { connect: { id: space_id } } : undefined,
	};

	if (id) {
		return await prisma.reservation.upsert({
			where: { id },
			update: payloadData,
			create: payloadData,
		});
	} else {
		return await prisma.reservation.create({
			data: payloadData,
		});
	}
};

export const updateReservation = async (
	id: number,
	data: Prisma.ReservationUpdateInput
) => {
	return await prisma.reservation.update({ where: { id }, data });
};

export const deleteReservationModel = async (id: number) => {
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

export const getReservationBySpaceId = async (space_id: number) => {
	return await prisma.reservation.findMany({
		where: { space_id },
		include: {
			package: true,
			space: true,
			booking: true,
		},
	});
};

export const getReservedSpaceModel = async (data: any) => {
	return await prisma.reservation.findMany({
		where: {
			space_id: parseInt(data.space_id),
			date: new Date(data.date),
		},
	});
};

export const getAnonymousReservationsModel = async (anonymousId: any) => {
	if (!anonymousId) return [];
	return await prisma.reservation.findMany({
		where: {
			anonymous_id: anonymousId,
		},
		include: {
			package: true,
			space: true,
			booking: true,
		},
	});
};

export const reservationExistsModel = async (data: any) => {
	return await prisma.reservation.findFirst({
		where: {
			date: new Date(data.date),
			space_id: parseInt(data.space_id),
			OR: [
				{
					AND: [
						{ start_time: { lt: data.end_time } }, // Existing start_time is before or at the new end_time
						{ end_time: { gt: data.start_time } }, // Existing end_time is after or at the new start_time
					],
				},
			],
		},
		include: {
			space: true,
		},
	});
};

export const deleteReservationCronJob = async () => {
	const tenMinsAgo = new Date(new Date().getTime() - 10 * 60 * 1000);

	return await prisma.reservation.deleteMany({
		where: {
			updated_at: { lte: tenMinsAgo },
			booking_id: null,
		},
	});
};
