import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma/db";


export const indexModel = async () => {
    return await prisma.user.findMany();
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    return await prisma.user.create({ data });
}

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
    return await prisma.user.update({ where: { id }, data });
}

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({ where: { id } });
}

export const findUserById = async (id: number) => {
    return await prisma.user.findUnique({ where: { id } });
}

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
}


