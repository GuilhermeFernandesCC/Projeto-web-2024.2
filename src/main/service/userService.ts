import { UserAddDto } from "../Dto/userAddDto";
import { UserDto } from "../Dto/userDto";
import { emailAlreadyUsed } from "../error/emailAlreadyUsed";
import { UserNotFound } from "../error/userNotFound";
import { userAddRepository,userGetRepository,userDeleteRepository,userUpdateRepository, userGetAllRepository, userEmailinUseRepository, userGetByEmailRepository} from "../repository/userRepository";

const emailinUse = async (email:string): Promise<any> => {
	if (await userEmailinUseRepository(email)){
		throw emailAlreadyUsed();
	}
}

export const userAddService = async (userDto: UserAddDto): Promise<UserDto | null> => {
	await emailinUse(userDto.email);
	return await userAddRepository(userDto);
};

export const userGetService = async(id: number): Promise<UserDto| null> => {
	const result = await userGetRepository(id);
	if (result == null){
		throw UserNotFound()
	}

	return result ;
};

export const userDeleteService = async(id: number): Promise<UserDto| null> => {
	const result = await userGetRepository(id);
	if (result == null){
		throw UserNotFound()
	}
	return await userDeleteRepository(id);
}

export const userUpdateService = async(id:number,userAddDto:UserAddDto): Promise<UserDto| null> => {
	const result = await userGetRepository(id);
	if (result == null){
		throw UserNotFound()
	}
	return await userUpdateRepository(id,userAddDto);
}

export const userGetAllService = async(): Promise<UserDto[]| null> => {
	const result = await userGetAllRepository();

	return result ;
};

export const userGetByEmailService = async(email:string): Promise<UserAddDto| null> => {
	const result = await userGetByEmailRepository(email);
	return result;
}