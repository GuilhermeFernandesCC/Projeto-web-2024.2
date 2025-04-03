import { TableAddDto } from "../Dto/tableAddDto";
import { TableUpdateDto } from "../Dto/tableUpdateDto";
import { TableDto } from "../Dto/tableDto";
import { TableNotFound } from "../error/tableNotFound";
import { tableAddRepository, tableDeleteRepository, tableGetAllRepository, tableGetByUserMasterRespository, tableGetRepository, tableUpdateRepository, addPlayerToTable, removePlayerFromTable} from "../repository/tableRepository";
import { userGetService,userGetByEmailService } from "./userService";

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
export const tableUpdateService = async(id: number,tableUpdateDto: TableUpdateDto): Promise<TableDto| null> => {
    await tableGetService(id)
    const result = await tableUpdateRepository(id,tableUpdateDto)
    return result;
};
export const tableGetAllService = async(): Promise<TableDto[]| null> => {
    const result = await tableGetAllRepository();

    return result ;
};

export const addPlayerTableService = async(userEmail:string,tableId:number) => {
    const userDto = await userGetByEmailService(userEmail)
    if(userDto?.id){
        await addPlayerToTable(userDto.id,tableId)
    }
    
}

export const removePlayerTableService = async(userEmail:string,tableId:number) => {
    const userDto = await userGetByEmailService(userEmail)
    if(userDto?.id){
        await removePlayerFromTable(userDto.id,tableId)
    }
}

export const tableGetPlayersServices = async(tableId:number) => {
    
}