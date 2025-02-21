import { Prisma, PrismaClient } from "@prisma/client";
import { TableAddDto } from "../Dto/tableAddDto";
import { promises } from "dns";
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