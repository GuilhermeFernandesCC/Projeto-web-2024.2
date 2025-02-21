import { UserAddDto } from "../Dto/userAddDto";
import { User } from "../model/userModel";
import { userAddRepository } from "../repository/userRepository";

export const userAddService = async (userDto: UserAddDto): Promise<User | null> => {

	const user:User = userDto;
	return await userAddRepository(user);
};