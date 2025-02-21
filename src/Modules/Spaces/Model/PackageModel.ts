import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';

export const createPackage = async (data: any) => {
	const { package_offer, space_id, ...result } = data;
	return await prisma.package.create({
		data: {
			...result,
			space: {
				connect: {
					id: parseInt(space_id),
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
