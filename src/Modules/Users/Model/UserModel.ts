import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma/db";

export default prisma;

export const indexModel = async () => {
    return await prisma.user.findMany();
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    return await prisma.user.create({ data });
}

