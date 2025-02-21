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
	const retultUser = await prisma.user.findUnique({
		where:{
			id: id
		}
	})
	
	if (retultUser!=null){
		const userDto:UserDto = retultUser;
		return userDto
	}
	return null;
}