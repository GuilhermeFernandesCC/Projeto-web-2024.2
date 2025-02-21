import { PrismaClient } from '@prisma/client';
import { User } from '../model/userModel';

const prisma = new PrismaClient();

export const userAddRepository = async (user:User): Promise<User | null> => {
	const resultUser = await prisma.user.create({
		data: {
			...user
		}
	})
	return resultUser;
};