import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma/db";

export const indexModel = async () => {
    return await prisma.space.findMany()
}

export const createSpace = async (data: Prisma.SpaceCreateInput) => {
    return await prisma.space.create({ data })
}