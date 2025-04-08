import { TokenAddDto } from "../Dto/tokenAddDto";
import { TokenDto } from "../Dto/tokenDto";
import { TokenNotFound } from "../error/tokenNotFound";
import { tokenAddRepository, tokenDeleteRepository, tokenGetAllRepository, tokenGetRepository, tokenUpdateRepository, userWithTokenRepository } from "../repository/tokenRepository";
import { userGetService } from "./userService";

const userWithTokenService = async (userid:number): Promise<number>=>{
    const result = await userWithTokenRepository(userid);
    if(!result){
        throw TokenNotFound();
    }
    return result;
}


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
export const tokenDeleteService = async(userId:number):Promise<TokenDto|null> => {
    const tokenId = await userWithTokenService(userId)
    const tokenResult = await tokenDeleteRepository(tokenId);
    return tokenResult;
}
export const tokenUpdateService = async(userId: number,tokenAddDto: TokenAddDto): Promise<TokenDto| null> => {
    const tokenId = await userWithTokenService(userId)
    const result = await tokenUpdateRepository(tokenId,tokenAddDto)
    return result;
};