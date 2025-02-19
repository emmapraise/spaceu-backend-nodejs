import { Prisma } from "@prisma/client";
import prisma from "../../../../prisma/db";

export default prisma;

export const indexModel = async () => {
    return await prisma.user.findMany();
}

