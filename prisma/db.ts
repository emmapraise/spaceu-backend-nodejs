import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

declare let global: {
	prisma: PrismaClient;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else if (
	process.env.NODE_ENV === 'test' ||
	process.env.NODE_ENV === 'development'
) {
	dotenv.config({
		path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
	});
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}

	prisma = global.prisma;

	prisma.$extends({
		model: {
			$allModels: {
				async getModelName<T>(this: T) {
					return Prisma.getExtensionContext(this);
				},
			},
		},
	});
}

export default prisma;
