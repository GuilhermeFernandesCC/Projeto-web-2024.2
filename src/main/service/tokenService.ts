import { TokenAddDto } from "../Dto/tokenAddDto";
import { TokenDto } from "../Dto/tokenDto";
import { TokenNotFound } from "../error/tokenNotFound";
import { tokenAddRepository, tokenDeleteRepository, tokenGetAllRepository, tokenGetRepository, tokenUpdateRepository } from "../repository/tokenRepository";
import { userGetService } from "./userService";

export const tokenAddService = async (tokenAddDto:TokenAddDto): Promise<TokenDto | null> =>{
    await userGetService(tokenAddDto.userId);

    const result = await tokenAddRepository(tokenAddDto);
    return result as TokenDto;
}
export const tokenGetService = async(id: number): Promise<TokenDto| null> => {
    const result = await tokenGetRepository(id);
    if (result == null){
        throw TokenNotFound()
    }

    return result ;
};
export const tokenGetAllService = async(): Promise<TokenDto[]|null> => {
    const result = await tokenGetAllRepository();
    return result ;
};
export const tokenDeleteService = async(id:number):Promise<TokenDto|null> => {
    await tokenGetService(id);
    const result = await tokenDeleteRepository(id);
    return result;
}
export const tokenUpdateService = async(id: number,tokenAddDto: TokenAddDto): Promise<TokenDto| null> => {
    await tokenGetService(id)
    const result = await tokenUpdateRepository(id,tokenAddDto)
    return result;
};