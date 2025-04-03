import { PrismaClient } from '@prisma/client';
import { UserAddDto } from '../Dto/userAddDto';
import { UserDto } from '../Dto/userDto';
import { UserGetDto } from '../Dto/userGetDto'
import { TableDto } from '@Dto/tableDto';

const prisma = new PrismaClient();


export const userAddRepository = async (userDto:UserAddDto): Promise<UserGetDto | null> => {
	const resultUser = await prisma.user.create({
		data: {
			...userDto
		}
	})
	return resultUser;
};

export const userGetRepository = async(id:number): Promise<UserGetDto|null> => {
	const resultUser = await prisma.user.findUnique({
		where:{
			id: id
		}
	})
	
	return resultUser ? resultUser as UserGetDto : null;
}

export const userGetAllRepository = async(): Promise<UserGetDto[]|null> => {
	const resultUsers = await prisma.user.findMany()
	return resultUsers.map( user => user as UserGetDto)
}

export const userDeleteRepository = async(id:number): Promise<UserGetDto|null> => {
	const resultUser = await prisma.user.delete({
		where:{
			id: id
		}
	})
	return resultUser ? resultUser as UserGetDto : null;
}

export const userUpdateRepository = async(id:number,userAddDto:UserAddDto): Promise<UserGetDto|null> => {
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

export const userEmailinUseRepository = async(email:string):Promise<boolean> => {
	return await prisma.user.count({
		where:{
			email:email
		}
	}) > 0
}

export const userGetByEmailRepository = async(email:string):Promise<UserDto|null> => {
	const resultUser = await prisma.user.findUnique({
		where: {
			email:email
		}
	})
	return resultUser ? resultUser as UserDto : null;

}

export const tablesAsMaster = async(userId:number):Promise<TableDto[]> =>{
	const resutlTables = await prisma.table.findMany({
		where: {
			masterId:userId
		}
	})
	return resutlTables as TableDto[];
}

export const tablesAsPlayer = async (userId: number):Promise<TableDto[]> => {
	const userTables = await prisma.userOnTables.findMany({
	  where: {
		userId: userId, // Filtra pelo ID do usuário
	  },
	  include: {
		table: true, // Inclui os dados da tabela associada
	  },
	});
  
	return userTables.map((entry) => entry.table as TableDto); // Retorna apenas as mesas
  };