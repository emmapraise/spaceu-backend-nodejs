import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';

export const indexModel = async () => {
	return await prisma.space.findMany({
		include: { packages: { include: { package_offer: true } } },
	});
};

export const createSpace = async (data: Prisma.SpaceCreateInput) => {
	const { packages = [], ...result } = data;

	return await prisma.space.create({
		data: {
			...result,
			packages: {
				create: packages.map((item: any) => ({
					name: item.name,
					description: item.description,
					price: item.price,
					type: item.type,
					package_offer: {
						createMany: {
							data: item.package_offer,
						},
					},
				})),
			},
		},
		include: {
			packages: {
				include: {
					package_offer: true,
				},
			},
		},
	});
};

export const createSpaceOnly = async (data: any) => {
	return await prisma.space.create({ data });
};

export const updateSpace = async (
	id: number,
	data: Prisma.SpaceUpdateInput
) => {
	return await prisma.space.update({ where: { id }, data });
};

export const deleteSpace = async (id: number) => {
	return await prisma.space.delete({ where: { id } });
};

export const findSpaceById = async (id: number) => {
	return await prisma.space.findUnique({
		where: { id },
		include: { packages: { include: { package_offer: true } } },
	});
};
