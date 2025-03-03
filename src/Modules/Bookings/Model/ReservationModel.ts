import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';
import { TimeSlotEnum } from '../../../Libs/Constant/TimeConstant';
import { calculateEndTime } from '../../../Libs/Utils/ReservationHelper';

export const indexModel = async () => {
	return await prisma.reservation.findMany();
};

export const createReservation = async (data: any, anonymousId: string) => {
	const {
		package_id,
		space_id,
		booking_id,
		date,
		start_time,
		duration,
		...result
	} = data;
	const startTime = Number(TimeSlotEnum[start_time]);
	return await prisma.reservation.create({
		data: {
			...result,
			anonymous_id: anonymousId,
			duration,
			start_time: startTime,
			end_time: calculateEndTime(startTime, duration),
			date: new Date(date),
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
	const { start_time, duration, ...rest } = data;
	const startTime = Number(TimeSlotEnum[start_time]);
	return await prisma.reservation.findFirst({
		where: {
			date: new Date(data.date),
			space_id: parseInt(data.space_id),
			OR: [
				{
					AND: [
						{ start_time: { lte: calculateEndTime(startTime, duration) } }, // Existing start_time is before or at the new end_time
						{ end_time: { gte: startTime } }, // Existing end_time is after or at the new start_time
					],
				},
			],
		},
		include:{
			space:true,
		}
	});
};
