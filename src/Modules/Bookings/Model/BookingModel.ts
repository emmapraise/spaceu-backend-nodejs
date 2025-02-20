import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma/db";

export const indexModel = async () => {
    return await prisma.booking.findMany();
}

export const createBooking = async (data: Prisma.BookingCreateInput) => {
    return await prisma.booking.create({ data });
}

export const updateBooking = async (id: number, data: Prisma.BookingUpdateInput) => {
    return await prisma.booking.update({ where: { id }, data });
}