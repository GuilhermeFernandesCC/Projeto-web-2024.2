import { UserAddDto } from "@Dto/userAddDto";
import { UserDto } from "@Dto/userDto";
import { UserGetDto } from "@Dto/userGetDto";
import { emailAlreadyUsed } from "@error/emailAlreadyUsed";
import { InvalidInput } from "@error/invalidInput";
import { InvalidInputFill } from "@error/invalidInputFill";
import { UserNotFound } from "@error/userNotFound";
import { userAddRepository,userGetRepository,userDeleteRepository,userUpdateRepository, userGetAllRepository, userEmailinUseRepository, userGetByEmailRepository} from "@repository/userRepository";
import { hashPassword } from "@utils/auth";

const emailinUse = async (email:string): Promise<any> => {
	if (await userEmailinUseRepository(email)){
		throw emailAlreadyUsed();
	}
}

const verifciarCampo = (campo:string): boolean =>{
	return (campo==="" || campo==""  );
}
const verificarCamposUser=(userDto: UserAddDto) => {
	const campos = ["name","email","senha"]
	
	if(!campos.every(campo => Object.values(userDto))){
		throw InvalidInput();
	}
	
	let errorMessage = ""
	for (const key in userDto){
		if(verifciarCampo(userDto[key as keyof typeof userDto ])){
			errorMessage += String(key)+" "
		}
	}
	if (errorMessage !== ""){
		throw InvalidInputFill(errorMessage);
	}
}


export const userAddService = async (userDto: UserAddDto): Promise<UserGetDto | null> => {
	verificarCamposUser(userDto)
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
	verificarCamposUser(userAddDto)
	await emailinUse(userAddDto.email)
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