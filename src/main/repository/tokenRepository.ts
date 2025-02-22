import { PrismaClient } from "@prisma/client";
import { TokenAddDto } from "../Dto/tokenAddDto";
import { TokenDto } from "../Dto/tokenDto";

const prisma = new PrismaClient();

export const tokenAddRepository = async (tokenAddDto:TokenAddDto): Promise<TokenDto|null> => {
    const resultToken = await prisma.token.create({
        data:{
            user:{connect:{id:tokenAddDto.userId}}
        }
    })
    return resultToken? resultToken as TokenDto : null;
}
export const tokenGetRepository = async(id:number): Promise<TokenDto|null> => {
    const resultToken= await prisma.token.findUnique({
        where:{
            id: id
        }
    })
    
    return resultToken ? resultToken as TokenDto : null;
}

export const tokenDeleteRepository = async(id:number): Promise<TokenDto|null> => {
    const resultToken = await prisma.token.delete({
        where:{
            id: id
        }
    })
    
    return resultToken ? resultToken as TokenDto : null;
}

export const tokenUpdateRepository = async(id:number,tokenAddDto:TokenAddDto): Promise<TokenDto|null> => {
    const resultToken = await prisma.token.update({
        where: {
            id:id
        },
        data: {
            //To do
        }
    })
    console.log(resultToken)
    return resultToken? resultToken as TokenDto : null;
}

export const tokenGetAllRepository = async(): Promise<TokenDto[]|null> => {
    const resultTokens = await prisma.token.findMany()
    return resultTokens.map( token => token as TokenDto)
}