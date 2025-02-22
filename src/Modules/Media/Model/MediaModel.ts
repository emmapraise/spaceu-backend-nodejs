import { Prisma } from '@prisma/client';
import prisma from '../../../../prisma/db';

export const indexModel = async () => {
	return await prisma.media.findMany();
};

export const createMedia = async (data: any) => {
	return await prisma.media.create({
		data: {
			url: data.url,
			type: data.resource_type,
			secure_url: data.secure_url,
			public_id: data.public_id,
			filename: data.original_filename,
			folder: data.folder,
		},
	});
};

export const deleteMedia = async (id: number) => {
    return await prisma.media.delete({ where: { id } });
};

export const findMediaById = async (id: number) => {
    return await prisma.media.findUnique({ where: { id } });
};

export const findMediaByPublicId = async (public_id: string) => {
    return await prisma.media.findUnique({ where: { public_id } });
};