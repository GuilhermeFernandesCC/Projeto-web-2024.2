import { Prisma, PrismaClient } from "@prisma/client";
import { TableAddDto } from "../Dto/tableAddDto";
import { TableDto } from "../Dto/tableDto";

const prisma = new PrismaClient();

export const tableAddRepository = async (tabelAddDto:TableAddDto): Promise<TableDto|null> => {
    const resultTable = await prisma.table.create({
        data:{
            name:tabelAddDto.name,
            master:{connect:{id:tabelAddDto.masterId}}
        }
    })
    return resultTable as TableDto;
}
export const tableGetRepository = async(id:number): Promise<TableDto|null> => {
    const resultTable = await prisma.table.findUnique({
        where:{
            id: id
        }
    })
    
    return resultTable ? resultTable as TableDto : null;
}

export const tableDeleteRepository = async(id:number): Promise<TableDto|null> => {
    const resultTable = await prisma.table.delete({
        where:{
            id: id
        }
    })
    
    return resultTable ? resultTable as TableDto : null;
}

export const tableUpdateRepository = async(id:number,tableAddDto:TableAddDto): Promise<TableDto|null> => {
    const resultTable = await prisma.table.update({
        where: {
            id:id
        },
        data: {
            ...tableAddDto
        }
    })
    console.log(resultTable)
    return resultTable ? resultTable as TableDto : null;
}