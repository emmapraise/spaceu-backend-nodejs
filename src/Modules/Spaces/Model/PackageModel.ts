import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';

export const createPackage = async (data: any) => {
	const { package_offer, id, duration,  ...result } = data;
	return await prisma.package.create({
		data: {
			...result,
			duration: parseInt(duration),
			space: {
				connect: {
					id: parseInt(id),
				},
			},
			package_offer: {
				createMany: {
					data: package_offer,
				},
			},
		},
	});
};
