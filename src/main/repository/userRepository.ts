import { PrismaClient } from '@prisma/client';
import { UserAddDto } from '../Dto/userAddDto';
import { UserDto } from '../Dto/userDto';

const prisma = new PrismaClient();

export const userAddRepository = async (userDto:UserAddDto): Promise<UserDto | null> => {
	const resultUser = await prisma.user.create({
		data: {
			...userDto
		}
	})
	return resultUser;
};

export const userGetRepository = async(id:number): Promise<UserDto|null> => {
	const resultUser = await prisma.user.findUnique({
		where:{
			id: id
		}
	})
	
	return resultUser ? resultUser as UserDto : null;
}

export const userDeleteRepository = async(id:number): Promise<UserDto|null> => {
	const resultUser = await prisma.user.delete({
		where:{
			id: id
		}
	})
	return resultUser ? resultUser as UserDto : null;
}

export const userUpdateRepository = async(id:number,userAddDto:UserAddDto): Promise<UserDto|null> => {
	const resultUser = await prisma.user.update({
		where: {
			id:id
		},
		data: {
			...userAddDto
		}
	})
	return resultUser ? resultUser as UserDto : null;
}