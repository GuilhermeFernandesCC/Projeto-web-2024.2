import { CanvasAddDto } from "../Dto/canvasAddDto";
import { CanvasDto } from "../Dto/canvasDto";
import { CanvasNotFound } from "../error/canvasNotFound";
import { canvasAddRepository, canvasDeleteRepository, canvasGetAllRepository, canvasGetRepository, canvasUpdateRepository } from "../repository/canvasRepository";
import { tableGetService } from "./tableService";

export const canvasAddService = async (canvasAddDto:CanvasAddDto): Promise<CanvasDto | null> =>{
    await tableGetService(canvasAddDto.tableId);

    const result = await canvasAddRepository(canvasAddDto);
    return result as CanvasDto;
}
export const canvasGetService = async(id: number): Promise<CanvasDto| null> => {
    const result = await canvasGetRepository(id);
    if (result == null){
        throw CanvasNotFound()
    }

    return result ;
};
export const canvasDeleteService = async(id:number):Promise<CanvasDto|null> => {
    await canvasGetService(id);
    const result = await canvasDeleteRepository(id);
    return result;
}
export const canvasUpdateService = async(id: number,canvasAddDto: CanvasAddDto): Promise<CanvasDto| null> => {
    await canvasGetService(id)
    const result = await canvasUpdateRepository(id,canvasAddDto)
    return result;
};
export const canvasGetAllService = async(): Promise<CanvasDto[]| null> => {
    const result = await canvasGetAllRepository();

    return result ;
};