import { TableAddDto } from "../Dto/tableAddDto";
import { TableDto } from "../Dto/tableDto";
import { tableAddRepository } from "../repository/tableRepository";
import { userGetService } from "./userService";

export const tableAddService = async (tableDto:TableAddDto): Promise<TableDto|null> => {
    
    await userGetService(tableDto.masterId) //Verifica se User Existe

    const result = await tableAddRepository(tableDto)
    return result as TableDto;
}