import { PrismaClient } from "@prisma/client";
import { tableGetService } from "../service/tableService";
import { CanvasAddDto } from "../Dto/canvasAddDto";
import { CanvasDto } from "../Dto/canvasDto";

const prisma = new PrismaClient();

export const canvasAddRepository = async (canvasAddDto:CanvasAddDto): Promise<CanvasDto|null> => {
    await tableGetService(canvasAddDto.tableId)
    const resultCanvas = await prisma.canvas.create({
        data:{
            table:{connect:{id:canvasAddDto.tableId}}
        }
    })
    return resultCanvas ? resultCanvas as CanvasDto : null;
}
export const canvasGetRepository = async(id:number): Promise<CanvasDto|null> => {
    const resultCanvas= await prisma.canvas.findUnique({
        where:{
            id: id
        }
    })
    
    return resultCanvas ? resultCanvas as CanvasDto : null;
}

export const tableDeleteRepository = async(id:number): Promise<CanvasDto|null> => {
    const resultCanvas = await prisma.canvas.delete({
        where:{
            id: id
        }
    })
    
    return resultCanvas ? resultCanvas as CanvasDto : null;
}

export const tableUpdateRepository = async(id:number,canvasAddDto:CanvasAddDto): Promise<CanvasDto|null> => {
    const resultCanvas = await prisma.canvas.update({
        where: {
            id:id
        },
        data: {
            //To do
        }
    })
    console.log(resultCanvas)
    return resultCanvas? resultCanvas as CanvasDto : null;
}