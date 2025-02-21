import { UserAddDto } from "../Dto/userAddDto";
import { UserDto } from "../Dto/userDto";
import { UserNotFound } from "../error/userNotFound";
import { userAddRepository,userGetRepository,userDeleteRepository,userUpdateRepository} from "../repository/userRepository";

export const userAddService = async (userDto: UserAddDto): Promise<UserDto | null> => {
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