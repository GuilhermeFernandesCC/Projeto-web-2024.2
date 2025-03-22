import { Prisma, PrismaClient } from "@prisma/client";
import { TableAddDto } from "../Dto/tableAddDto";
import { TableDto } from "../Dto/tableDto";
import { TableUpdateDto } from "../Dto/tableUpdateDto";

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
            id: Number(id)
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

export const tableUpdateRepository = async(id:number,tableUpdateDto:TableUpdateDto): Promise<TableDto|null> => {
    const resultTable = await prisma.table.update({
        where: {
            id:id
        },
        data: {
            ...tableUpdateDto
        }
    })
    console.log(resultTable)
    return resultTable ? resultTable as TableDto : null;
}

export const tableGetAllRepository = async(): Promise<TableDto[]|null> => {
    const resultTables = await prisma.table.findMany()
    return resultTables.map( table => table as TableDto)
}

export const tableGetByUserMasterRespository = async(userId:number) : Promise<TableDto[]> => {
    const resultTables = await prisma.table.findMany(
        {where:{
            masterId:userId
        }
        }
    )
    return resultTables as TableDto[];
}