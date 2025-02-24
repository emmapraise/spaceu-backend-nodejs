import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';

export const indexModel = async () => {
	return await prisma.space.findMany({
		include: {
			packages: { include: { package_offer: true } },
			spotlight_image: true,
			parent_space: true,
			images: true,
		},
	});
};

export const createSpace = async (data: Prisma.SpaceCreateInput | any) => {
	const { packages, ...result } = data;

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
	const { spotlight_image_id, images, parent_space_id, ...result } = data;
	return await prisma.space.create({
		data: {
			spotlight_image: spotlight_image_id
				? { connect: { id: spotlight_image_id } }
				: undefined,
			parent_space: parent_space_id
				? { connect: { id: parent_space_id } }
				: undefined,
			images: images ? { create: images } : undefined,
			...result,
		},
		include: {
			packages: {
				include: {
					package_offer: true,
				},
			},
			spotlight_image: true,
			parent_space: true,
			images: true,
		},
	});
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
		include: {
			packages: { include: { package_offer: true } },
			spotlight_image: true,
			parent_space: true,
			images: true,
		},
	});
};

export const dropDownModel = async () => {
	return await prisma.space.findMany({
		select: {
			id: true,
			name: true,
			type: true,
		},
	});
};
