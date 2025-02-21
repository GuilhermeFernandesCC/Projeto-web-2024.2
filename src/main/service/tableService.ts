import { TableAddDto } from "../Dto/tableAddDto";
import { TableDto } from "../Dto/tableDto";
import { TableNotFound } from "../error/tableNotFound";
import { tableAddRepository, tableGetRepository } from "../repository/tableRepository";
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