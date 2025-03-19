import { UserAddDto } from "@Dto/userAddDto";
import { UserDto } from "@Dto/userDto";
import { UserGetDto } from "@Dto/userGetDto";
import { emailAlreadyUsed } from "@error/emailAlreadyUsed";
import { UserNotFound } from "@error/userNotFound";
import { userAddRepository,userGetRepository,userDeleteRepository,userUpdateRepository, userGetAllRepository, userEmailinUseRepository, userGetByEmailRepository} from "@repository/userRepository";
import { hashPassword } from "@utils/auth";

const emailinUse = async (email:string): Promise<any> => {
	if (await userEmailinUseRepository(email)){
		throw emailAlreadyUsed();
	}
}

export const userAddService = async (userDto: UserAddDto): Promise<UserGetDto | null> => {
	await emailinUse(userDto.email);
	userDto.senha = await hashPassword(userDto.senha)
	return await userAddRepository(userDto);
};

export const userGetService = async(id: number): Promise<UserGetDto| null> => {
	const result = await userGetRepository(id);
	if (result == null){
		throw UserNotFound()
	}

	return result ;
};

export const userDeleteService = async(id: number): Promise<UserGetDto| null> => {
	const result = await userGetRepository(id);
	if (result == null){
		throw UserNotFound()
	}
	return await userDeleteRepository(id);
}

export const userUpdateService = async(id:number,userAddDto:UserAddDto): Promise<UserGetDto| null> => {
	emailinUse(userAddDto.email)
	const result = await userGetRepository(id);
	if (result == null){
		throw UserNotFound()
	}
	return await userUpdateRepository(id,userAddDto);
}

export const userGetAllService = async(): Promise<UserGetDto[]| null> => {
	const result = await userGetAllRepository();

	return result ;
};

export const userGetByEmailService = async(email:string): Promise<UserDto| null> => {
	const result = await userGetByEmailRepository(email);
	return result;
}