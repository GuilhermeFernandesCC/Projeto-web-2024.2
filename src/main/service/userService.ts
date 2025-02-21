import { UserAddDto } from "../Dto/userAddDto";
import { UserDto } from "../Dto/userDto";
import { UserNotFound } from "../error/userNotFound";
import { userAddRepository,userGetRepository } from "../repository/userRepository";

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