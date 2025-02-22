import { TableAddDto } from "../Dto/tableAddDto";
import { TableDto } from "../Dto/tableDto";
import { TableNotFound } from "../error/tableNotFound";
import { tableAddRepository, tableDeleteRepository, tableGetAllRepository, tableGetRepository, tableUpdateRepository } from "../repository/tableRepository";
import { userGetService } from "./userService";

export const tableAddService = async (tableDto:TableAddDto): Promise<TableDto|null> => {
    
    await userGetService(tableDto.masterId) //Verifica se User Existe

    const result = await tableAddRepository(tableDto)
    return result as TableDto;
}
export const tableGetService = async(id: number): Promise<TableDto| null> => {
    const result = await tableGetRepository(id);
    if (result == null){
        throw TableNotFound()
    }

    return result ;
};
export const tableDeleteService = async(id: number): Promise<TableDto| null> => {
    await tableGetService(id)
    const result = await tableDeleteRepository(id)
    return result;
};
export const tableUpdateService = async(id: number,tableAddDto: TableAddDto): Promise<TableDto| null> => {
    await tableGetService(id)
    const result = await tableUpdateRepository(id,tableAddDto)
    return result;
};
export const tableGetAllService = async(): Promise<TableDto[]| null> => {
    const result = await tableGetAllRepository();

    return result ;
};